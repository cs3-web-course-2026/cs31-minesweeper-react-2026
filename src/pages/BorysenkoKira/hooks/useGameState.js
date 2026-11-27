import { useState, useEffect, useCallback } from 'react';
import {
  CONFIG,
  GAME_STATUS,
  CELL_TYPE,
  CELL_STATE,
} from '../constants/game';
import { generateBoard } from '../utils/board';
import { checkWinCondition } from '../utils/checks';
import { revealCells, revealAllMines } from '../utils/reveal';

export function useGameState() {
  const [board, setBoard] = useState(() =>
    generateBoard(CONFIG.ROWS, CONFIG.COLS, CONFIG.MINES_COUNT)
  );
  const [status, setStatus] = useState(GAME_STATUS.PROCESS);
  const [gameTime, setGameTime] = useState(0);
  const [explodedCell, setExplodedCell] = useState(null);

  const initGame = useCallback(() => {
    setBoard(generateBoard(CONFIG.ROWS, CONFIG.COLS, CONFIG.MINES_COUNT));
    setStatus(GAME_STATUS.PROCESS);
    setGameTime(0);
    setExplodedCell(null);
  }, []);

  useEffect(() => {
    if (status !== GAME_STATUS.PROCESS) return;

    const timerId = setInterval(() => {
      setGameTime((prev) => prev + 1);
    }, CONFIG.TIMER_INTERVAL);

    return () => clearInterval(timerId);
  }, [status]);

  const handleOpenCell = useCallback(
    (row, col) => {
      if (status !== GAME_STATUS.PROCESS) return;

      const targetCell = board[row][col];
      if (
        targetCell.state === CELL_STATE.OPENED ||
        targetCell.state === CELL_STATE.FLAGGED
      ) {
        return;
      }

      if (targetCell.type === CELL_TYPE.MINE) {
        setExplodedCell({ row, col });
        setBoard(revealAllMines(board));
        setStatus(GAME_STATUS.LOSE);
        return;
      }

      const updatedBoard = revealCells(board, row, col);
      setBoard(updatedBoard);

      if (checkWinCondition(updatedBoard)) {
        setStatus(GAME_STATUS.WIN);
      }
    },
    [board, status]
  );

  const handleToggleFlag = useCallback(
    (row, col) => {
      if (status !== GAME_STATUS.PROCESS) return;

      const targetCell = board[row][col];
      if (targetCell.state === CELL_STATE.OPENED) return;

      const nextBoard = board.map((r) =>
        r.map((cell) => {
          if (cell.row !== row || cell.col !== col) return cell;
          const nextState =
            cell.state === CELL_STATE.CLOSED
              ? CELL_STATE.FLAGGED
              : CELL_STATE.CLOSED;
          return { ...cell, state: nextState };
        })
      );

      setBoard(nextBoard);
    },
    [board, status]
  );

  const flagsUsed = board
    .flat()
    .filter((cell) => cell.state === CELL_STATE.FLAGGED).length;
  const flagsLeft = CONFIG.MINES_COUNT - flagsUsed;

  return {
    board,
    status,
    gameTime,
    flagsLeft,
    explodedCell,
    initGame,
    handleOpenCell,
    handleToggleFlag,
  };
}