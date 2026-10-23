import { useCallback, useMemo, useState } from 'react';
import { useGameTimer } from './useGameTimer.js';

const ROWS = 10;
const COLS = 10;
const MINES_COUNT = 15;
const DIRECTIONS = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1],
];

const CELL_TYPE = { EMPTY: 'empty', MINE: 'mine' };
const CELL_STATE = { CLOSED: 'closed', OPENED: 'opened', FLAGGED: 'flagged' };
const GAME_STATUS = { PROCESS: 'process', WIN: 'win', LOSE: 'lose' };

function createBoard() {
  const board = Array.from({ length: ROWS }, () =>
    Array.from({ length: COLS }, () => ({
      type: CELL_TYPE.EMPTY,
      state: CELL_STATE.CLOSED,
      neighborMines: 0,
      isExploded: false,
    })),
  );

  let placedMines = 0;
  while (placedMines < MINES_COUNT) {
    const row = Math.floor(Math.random() * ROWS);
    const col = Math.floor(Math.random() * COLS);

    if (board[row][col].type === CELL_TYPE.MINE) continue;
    board[row][col].type = CELL_TYPE.MINE;
    placedMines += 1;
  }

  board.forEach((rowCells, row) => {
    rowCells.forEach((cell, col) => {
      if (cell.type === CELL_TYPE.MINE) return;
      cell.neighborMines = getNeighbors(row, col).filter(
        ([neighborRow, neighborCol]) =>
          board[neighborRow][neighborCol].type === CELL_TYPE.MINE,
      ).length;
    });
  });

  return board;
}

function getNeighbors(row, col) {
  return DIRECTIONS.map(([rowOffset, colOffset]) => [
    row + rowOffset,
    col + colOffset,
  ]).filter(
    ([neighborRow, neighborCol]) =>
      neighborRow >= 0 &&
      neighborRow < ROWS &&
      neighborCol >= 0 &&
      neighborCol < COLS,
  );
}

function cloneBoard(board) {
  return board.map((row) => row.map((cell) => ({ ...cell })));
}

function getCellLabel(cell, row, col) {
  const position = `Row ${row + 1}, column ${col + 1}`;

  if (cell.state === CELL_STATE.FLAGGED) return `${position}, flagged cell`;
  if (cell.state === CELL_STATE.CLOSED) return `${position}, closed cell`;
  if (cell.type === CELL_TYPE.MINE) return `${position}, mine`;
  if (cell.neighborMines === 0) return `${position}, open empty cell`;
  return `${position}, open cell with ${cell.neighborMines} adjacent mines`;
}

function openConnectedCells(board, row, col) {
  const queue = [[row, col]];

  while (queue.length > 0) {
    const [currentRow, currentCol] = queue.shift();
    const cell = board[currentRow][currentCol];

    if (cell.state !== CELL_STATE.CLOSED || cell.type === CELL_TYPE.MINE) {
      continue;
    }

    cell.state = CELL_STATE.OPENED;
    if (cell.neighborMines === 0) {
      queue.push(...getNeighbors(currentRow, currentCol));
    }
  }
}

function hasWon(board) {
  return board.every((row) =>
    row.every(
      (cell) =>
        cell.type === CELL_TYPE.MINE || cell.state === CELL_STATE.OPENED,
    ),
  );
}

export function useMinesweeper() {
  const [board, setBoard] = useState(createBoard);
  const [status, setStatus] = useState(GAME_STATUS.PROCESS);
  const [hasStarted, setHasStarted] = useState(false);
  const [gameTime, resetTimer] = useGameTimer(
    hasStarted && status === GAME_STATUS.PROCESS,
  );

  const flaggedCount = useMemo(
    () => board.flat().filter((cell) => cell.state === CELL_STATE.FLAGGED).length,
    [board],
  );

  const openCell = useCallback(
    (row, col) => {
      if (
        status !== GAME_STATUS.PROCESS ||
        row < 0 ||
        row >= ROWS ||
        col < 0 ||
        col >= COLS ||
        board[row][col].state !== CELL_STATE.CLOSED
      ) {
        return;
      }

      const nextBoard = cloneBoard(board);
      const selectedCell = nextBoard[row][col];
      setHasStarted(true);

      if (selectedCell.type === CELL_TYPE.MINE) {
        nextBoard.forEach((rowCells, mineRow) => {
          rowCells.forEach((cell, mineCol) => {
            if (cell.type !== CELL_TYPE.MINE) return;
            cell.state = CELL_STATE.OPENED;
            cell.isExploded = mineRow === row && mineCol === col;
          });
        });
        setBoard(nextBoard);
        setStatus(GAME_STATUS.LOSE);
        return;
      }

      openConnectedCells(nextBoard, row, col);
      setBoard(nextBoard);
      if (hasWon(nextBoard)) setStatus(GAME_STATUS.WIN);
    },
    [board, status],
  );

  const toggleFlag = useCallback(
    (row, col) => {
      if (
        status !== GAME_STATUS.PROCESS ||
        row < 0 ||
        row >= ROWS ||
        col < 0 ||
        col >= COLS
      ) {
        return;
      }

      const cell = board[row][col];
      if (cell.state === CELL_STATE.OPENED) return;
      if (
        cell.state === CELL_STATE.CLOSED &&
        flaggedCount >= MINES_COUNT
      ) {
        return;
      }

      const nextBoard = cloneBoard(board);
      nextBoard[row][col].state =
        cell.state === CELL_STATE.FLAGGED
          ? CELL_STATE.CLOSED
          : CELL_STATE.FLAGGED;
      setBoard(nextBoard);
    },
    [board, flaggedCount, status],
  );

  const resetGame = useCallback(() => {
    setBoard(createBoard());
    setStatus(GAME_STATUS.PROCESS);
    resetTimer();
    setHasStarted(false);
  }, [resetTimer]);

  let message = 'Open a cell to start the game.';
  if (status === GAME_STATUS.WIN) {
    message = 'You won! All safe cells are open.';
  } else if (status === GAME_STATUS.LOSE) {
    message = 'Game over. You opened a mine.';
  }

  return {
    board,
    status,
    gameTime,
    flaggedCount,
    minesRemaining: MINES_COUNT - flaggedCount,
    message,
    getCellLabel,
    openCell,
    toggleFlag,
    resetGame,
  };
}
