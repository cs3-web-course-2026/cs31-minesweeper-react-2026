import { useCallback, useMemo, useState } from 'react';
import { useGameTimer } from './useGameTimer.js';
import {
  CELL_STATE,
  CELL_TYPE,
  COLS,
  createBoard,
  hasWon,
  MINES_COUNT,
  openConnectedCells,
  ROWS,
} from '../utils/minesweeper.js';

const GAME_STATUS = { PROCESS: 'process', WIN: 'win', LOSE: 'lose' };

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
