import assert from 'node:assert/strict';
import test from 'node:test';

import {
  CELL_STATE,
  CELL_TYPE,
  GAME_ACTION,
  GAME_CONFIG,
  GAME_STATUS,
} from '../constants/game.js';
import {
  checkWinCondition,
  countFlags,
  createBoard,
  getNeighbours,
  revealCell,
  toggleFlag,
} from '../utils/board.js';
import { createInitialState, gameReducer } from '../utils/gameReducer.js';

const RANDOM_VALUES = Array(GAME_CONFIG.minesCount).fill(0);

function freezeBoard(board) {
  board.forEach((cells) => {
    cells.forEach(Object.freeze);
    Object.freeze(cells);
  });

  return Object.freeze(board);
}

function randomValuesFromSeed(seed) {
  let value = seed;

  return Array.from({ length: GAME_CONFIG.minesCount }, () => {
    value = (value * 1664525 + 1013904223) >>> 0;

    return value / 4294967296;
  });
}

test('100 deterministic boards have unique cells, exactly 15 mines and correct neighbours', () => {
  for (let seed = 1; seed <= 100; seed++) {
    const board = createBoard(GAME_CONFIG, randomValuesFromSeed(seed));
    assert.equal(
      board.flat().filter((cell) => cell.type === CELL_TYPE.MINE).length,
      15,
    );
    assert.equal(new Set(board.flat()).size, 100);

    board.forEach((cells, row) =>
      cells.forEach((cell, col) => {
        let expected = 0;

        for (
          let neighbourRow = Math.max(0, row - 1);
          neighbourRow <= Math.min(9, row + 1);
          neighbourRow++
        ) {
          for (
            let neighbourCol = Math.max(0, col - 1);
            neighbourCol <= Math.min(9, col + 1);
            neighbourCol++
          ) {
            if (
              (neighbourRow !== row || neighbourCol !== col) &&
              board[neighbourRow][neighbourCol].type === CELL_TYPE.MINE
            ) {
              expected++;
            }
          }
        }

        assert.equal(cell.neighborMines, expected);
        assert.equal(cell.state, CELL_STATE.CLOSED);
      }),
    );
  }
});

test('board generation is deterministic and leaves its random input unchanged', () => {
  const samples = Object.freeze(randomValuesFromSeed(42));
  assert.deepEqual(
    createBoard(GAME_CONFIG, samples),
    createBoard(GAME_CONFIG, samples),
  );
});

test('invalid dimensions, mine counts and random values are rejected', () => {
  for (const config of [
    { rows: 0, cols: 10, minesCount: 1 },
    { rows: 2.5, cols: 10, minesCount: 1 },
    { rows: 10, cols: 10, minesCount: -1 },
    { rows: 10, cols: 10, minesCount: 100 },
  ]) {
    assert.throws(() => createBoard(config, []), RangeError);
  }

  assert.throws(() => createBoard(GAME_CONFIG, []), RangeError);
  assert.throws(() => createBoard(GAME_CONFIG, Array(15).fill(1)), RangeError);
  assert.throws(
    () => createBoard(GAME_CONFIG, Array(15).fill(Number.NaN)),
    RangeError,
  );
});

test('mine-free and dense boards terminate with exact counts', () => {
  const empty = createBoard({ rows: 10, cols: 10, minesCount: 0 }, []);
  const dense = createBoard(
    { rows: 10, cols: 10, minesCount: 99 },
    Array(99).fill(0),
  );
  assert.equal(
    empty.flat().some((cell) => cell.type === CELL_TYPE.MINE),
    false,
  );
  assert.equal(
    dense.flat().filter((cell) => cell.type === CELL_TYPE.MINE).length,
    99,
  );
});

test('corners, edges and centre have 3, 5 and 8 neighbours', () => {
  const board = createBoard({ rows: 3, cols: 3, minesCount: 1 }, [0]);
  assert.equal(getNeighbours(board, 0, 0).length, 3);
  assert.equal(getNeighbours(board, 0, 1).length, 5);
  assert.equal(getNeighbours(board, 1, 1).length, 8);
});

test('revealing a numbered cell creates a new board without mutating frozen input', () => {
  const board = freezeBoard(
    createBoard({ rows: 3, cols: 3, minesCount: 1 }, [0]),
  );
  const next = revealCell(board, 0, 1);
  assert.notEqual(next, board);
  assert.equal(next[0][1].state, CELL_STATE.OPENED);
  assert.equal(board[0][1].state, CELL_STATE.CLOSED);
  assert.equal(
    next.flat().filter((cell) => cell.state === CELL_STATE.OPENED).length,
    1,
  );
});

test('recursive reveal opens safe regions but preserves flags and mines', () => {
  const board = createBoard(GAME_CONFIG, RANDOM_VALUES);
  const flagged = toggleFlag(board, 9, 9, 15);
  const next = revealCell(freezeBoard(flagged), 9, 8);
  assert.equal(
    next.flat().filter((cell) => cell.state === CELL_STATE.OPENED).length,
    84,
  );
  assert.equal(next[9][9].state, CELL_STATE.FLAGGED);
  assert.equal(
    next
      .flat()
      .some(
        (cell) =>
          cell.type === CELL_TYPE.MINE && cell.state === CELL_STATE.OPENED,
      ),
    false,
  );
  assert.equal(checkWinCondition(next), false);

  const won = revealCell(toggleFlag(next, 9, 9, 15), 9, 9);
  assert.equal(checkWinCondition(won), true);
});

test('flags are immutable, limited to 15 and removable at the limit', () => {
  let board = createBoard(GAME_CONFIG, RANDOM_VALUES);

  for (let position = 0; position < 15; position++) {
    board = toggleFlag(
      freezeBoard(board),
      Math.floor(position / 10),
      position % 10,
      15,
    );
  }

  assert.equal(countFlags(board), 15);
  assert.equal(toggleFlag(board, 9, 9, 15), board);
  const unflagged = toggleFlag(board, 0, 0, 15);
  assert.equal(countFlags(unflagged), 14);
  assert.equal(countFlags(toggleFlag(unflagged, 9, 9, 15)), 15);
});

test('invalid coordinates and actions on open or flagged cells are ignored', () => {
  const board = createBoard(GAME_CONFIG, RANDOM_VALUES);
  assert.equal(revealCell(board, -1, 0), board);
  assert.equal(toggleFlag(board, 10, 0, 15), board);
  const flagged = toggleFlag(board, 9, 9, 15);
  assert.equal(revealCell(flagged, 9, 9), flagged);
  const opened = revealCell(board, 1, 5);
  assert.equal(revealCell(opened, 1, 5), opened);
  assert.equal(toggleFlag(opened, 1, 5, 15), opened);
});

test('initial state is deterministic, idle and does not start the timer', () => {
  const initial = createInitialState();
  assert.deepEqual(initial, createInitialState());
  assert.equal(initial.status, GAME_STATUS.IDLE);
  assert.equal(
    gameReducer(initial, { type: GAME_ACTION.TICK, roundId: 0 }),
    initial,
  );
  assert.equal(initial.elapsedSeconds, 0);
});

test('the first flag generates the board and starts the round', () => {
  const state = gameReducer(createInitialState(), {
    type: GAME_ACTION.FLAG,
    row: 9,
    col: 9,
    randomValues: RANDOM_VALUES,
  });
  assert.equal(state.status, GAME_STATUS.PLAYING);
  assert.equal(
    state.board.flat().filter((cell) => cell.type === CELL_TYPE.MINE).length,
    15,
  );
  assert.equal(countFlags(state.board), 1);
});

test('numbered reveal starts a round, mine reveal loses, and finished state rejects actions', () => {
  const playing = gameReducer(createInitialState(), {
    type: GAME_ACTION.REVEAL,
    row: 1,
    col: 5,
    randomValues: RANDOM_VALUES,
  });
  assert.equal(playing.status, GAME_STATUS.PLAYING);
  const lost = gameReducer(playing, {
    type: GAME_ACTION.REVEAL,
    row: 0,
    col: 0,
  });
  assert.equal(lost.status, GAME_STATUS.LOST);
  assert.equal(lost.board[0][0].state, CELL_STATE.OPENED);

  for (const type of [GAME_ACTION.REVEAL, GAME_ACTION.FLAG, GAME_ACTION.TICK]) {
    assert.equal(gameReducer(lost, { type, row: 9, col: 9, roundId: 0 }), lost);
  }
});

test('opening all 85 safe cells wins without requiring mine flags', () => {
  const won = gameReducer(createInitialState(), {
    type: GAME_ACTION.REVEAL,
    row: 9,
    col: 9,
    randomValues: RANDOM_VALUES,
  });
  assert.equal(won.status, GAME_STATUS.WON);
  assert.equal(countFlags(won.board), 0);
  assert.equal(
    won.board.flat().filter((cell) => cell.state === CELL_STATE.OPENED).length,
    85,
  );
  assert.equal(gameReducer(won, { type: GAME_ACTION.TICK, roundId: 0 }), won);
});

test('restart resets all game state and rejects stale ticks from the previous round', () => {
  const playing = gameReducer(createInitialState(), {
    type: GAME_ACTION.FLAG,
    row: 9,
    col: 9,
    randomValues: RANDOM_VALUES,
  });
  const ticked = gameReducer(playing, { type: GAME_ACTION.TICK, roundId: 0 });
  assert.equal(ticked.elapsedSeconds, 1);
  const flagMode = gameReducer(ticked, { type: GAME_ACTION.TOGGLE_FLAG_MODE });
  assert.equal(flagMode.flagMode, true);
  const fresh = gameReducer(flagMode, { type: GAME_ACTION.RESTART });
  assert.deepEqual(fresh, createInitialState(1));
  const startedAgain = gameReducer(fresh, {
    type: GAME_ACTION.FLAG,
    row: 9,
    col: 9,
    randomValues: RANDOM_VALUES,
  });
  assert.equal(
    gameReducer(startedAgain, { type: GAME_ACTION.TICK, roundId: 0 }),
    startedAgain,
  );
  assert.equal(
    gameReducer(startedAgain, { type: GAME_ACTION.TICK, roundId: 1 })
      .elapsedSeconds,
    1,
  );
});

test('invalid first actions do not create a board or start a round', () => {
  const state = createInitialState();
  assert.equal(
    gameReducer(state, { type: GAME_ACTION.REVEAL, row: -1, col: 0 }),
    state,
  );
});
