import { useCallback, useReducer } from 'react';

import {
  CELL_CONTENT,
  CELL_STATE,
  DEFAULT_DIFFICULTY,
  DIFFICULTY_CONFIG,
  GAME_ACTION,
  GAME_STATUS,
  MAX_TIMER_SECONDS,
} from '../constants/game';
import { populateBoard, createBoard } from '../utils/board';
import { recordBestTime } from '../utils/bestTimes';
import { checkWinCondition, countFlags, isGameOver } from '../utils/checks';
import { toggleFlag } from '../utils/flags';
import { revealCell } from '../utils/reveal';
import { loadBestTimes, usePersistBestTimes } from './useBestTimes';

function createInitialState(difficulty, bestTimes) {
  const { rows, cols, minesCount } = DIFFICULTY_CONFIG[difficulty];

  return {
    difficulty,
    minesCount,
    board: createBoard(rows, cols),
    status: GAME_STATUS.IDLE,
    elapsedSeconds: 0,
    bestTimes,
  };
}

function resolveStatus(board, row, col) {
  if (board[row][col].content === CELL_CONTENT.MINE) {
    return GAME_STATUS.LOST;
  }

  return checkWinCondition(board) ? GAME_STATUS.WON : GAME_STATUS.PLAYING;
}

function handleRevealCell(state, { row, col }) {
  if (
    isGameOver(state.status) ||
    state.board[row][col].state !== CELL_STATE.CLOSED
  ) {
    return state;
  }

  const preparedBoard =
    state.status === GAME_STATUS.IDLE
      ? populateBoard(state.board, state.minesCount, row, col)
      : state.board;
  const revealedBoard = revealCell(preparedBoard, row, col);

  const status = resolveStatus(revealedBoard, row, col);
  const bestTimes =
    status === GAME_STATUS.WON
      ? recordBestTime(state.bestTimes, state.difficulty, state.elapsedSeconds)
      : state.bestTimes;

  return { ...state, board: revealedBoard, status, bestTimes };
}

function handleToggleFlag(state, { row, col }) {
  if (isGameOver(state.status)) {
    return state;
  }

  const board = toggleFlag(state.board, row, col, state.minesCount);

  return board === state.board ? state : { ...state, board };
}

function handleTick(state) {
  if (state.status !== GAME_STATUS.PLAYING) {
    return state;
  }

  return {
    ...state,
    elapsedSeconds: Math.min(state.elapsedSeconds + 1, MAX_TIMER_SECONDS),
  };
}

function gameReducer(state, action) {
  switch (action.type) {
    case GAME_ACTION.REVEAL_CELL:
      return handleRevealCell(state, action);
    case GAME_ACTION.TOGGLE_FLAG:
      return handleToggleFlag(state, action);
    case GAME_ACTION.TICK:
      return handleTick(state);
    case GAME_ACTION.RESTART:
      return createInitialState(state.difficulty, state.bestTimes);
    case GAME_ACTION.CHANGE_DIFFICULTY:
      return createInitialState(action.difficulty, state.bestTimes);
    default:
      return state;
  }
}

export function useGameState() {
  const [state, dispatch] = useReducer(
    gameReducer,
    DEFAULT_DIFFICULTY,
    (difficulty) => createInitialState(difficulty, loadBestTimes()),
  );

  usePersistBestTimes(state.bestTimes);

  const openCell = useCallback(
    (row, col) => dispatch({ type: GAME_ACTION.REVEAL_CELL, row, col }),
    [],
  );
  const toggleCellFlag = useCallback(
    (row, col) => dispatch({ type: GAME_ACTION.TOGGLE_FLAG, row, col }),
    [],
  );
  const tick = useCallback(() => dispatch({ type: GAME_ACTION.TICK }), []);
  const restart = useCallback(
    () => dispatch({ type: GAME_ACTION.RESTART }),
    [],
  );
  const changeDifficulty = useCallback(
    (difficulty) =>
      dispatch({ type: GAME_ACTION.CHANGE_DIFFICULTY, difficulty }),
    [],
  );

  return {
    ...state,
    flagsLeft: state.minesCount - countFlags(state.board),
    bestTime: state.bestTimes[state.difficulty] ?? null,
    tick,
    openCell,
    toggleCellFlag,
    restart,
    changeDifficulty,
  };
}
