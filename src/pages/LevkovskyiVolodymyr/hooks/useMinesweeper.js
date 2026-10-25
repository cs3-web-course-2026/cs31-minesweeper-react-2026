import { useState, useEffect, useCallback } from 'react';
import {
  CELL_TYPE,
  CELL_STATE,
  GAME_STATUS,
  BOARD_CONFIG,
} from '../constants/game';
import {
  createEmptyBoard,
  generateField,
  revealCellRecursively,
  checkWinCondition,
} from '../utils/gameLogic';

export function useMinesweeper(
  rows = BOARD_CONFIG.DEFAULT_ROWS,
  cols = BOARD_CONFIG.DEFAULT_COLS,
  minesCount = BOARD_CONFIG.DEFAULT_MINES,
) {
  const [board, setBoard] = useState(() => createEmptyBoard(rows, cols));
  const [gameStatus, setGameStatus] = useState(GAME_STATUS.STOP);
  const [seconds, setSeconds] = useState(0);
  const [flagsRemaining, setFlagsRemaining] = useState(minesCount);
  const [isFirstClick, setIsFirstClick] = useState(true);
  const [explodedCoordinates, setExplodedCoordinates] = useState(null);

  useEffect(() => {
    let timerId = null;

    if (gameStatus === GAME_STATUS.PROCESS) {
      timerId = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1);
      }, 1000);
    }

    return () => {
      if (timerId !== null) {
        clearInterval(timerId);
      }
    };
  }, [gameStatus]);

  const startGame = useCallback(() => {
    setBoard(createEmptyBoard(rows, cols));
    setGameStatus(GAME_STATUS.PROCESS);
    setSeconds(0);
    setFlagsRemaining(minesCount);
    setIsFirstClick(true);
    setExplodedCoordinates(null);
  }, [rows, cols, minesCount]);

  const stopGame = useCallback(() => {
    setBoard(createEmptyBoard(rows, cols));
    setGameStatus(GAME_STATUS.STOP);
    setSeconds(0);
    setFlagsRemaining(0);
    setIsFirstClick(true);
    setExplodedCoordinates(null);
  }, [rows, cols]);

  const openCell = useCallback(
    (row, col) => {
      if (gameStatus !== GAME_STATUS.PROCESS) {
        return;
      }

      let currentBoard = board;

      if (isFirstClick) {
        currentBoard = generateField(rows, cols, minesCount, row, col);
        setIsFirstClick(false);
      }

      const targetCell = currentBoard[row][col];

      if (
        targetCell.state === CELL_STATE.OPENED ||
        targetCell.state === CELL_STATE.FLAGGED
      ) {
        return;
      }

      if (targetCell.type === CELL_TYPE.MINE) {
        setExplodedCoordinates({ row, col });
        setGameStatus(GAME_STATUS.LOSE);
        setBoard(currentBoard);

        return;
      }

      const updatedBoard = revealCellRecursively(
        currentBoard,
        row,
        col,
        rows,
        cols,
      );

      setBoard(updatedBoard);

      if (checkWinCondition(updatedBoard, rows, cols)) {
        setGameStatus(GAME_STATUS.WIN);
      }
    },
    [board, gameStatus, isFirstClick, rows, cols, minesCount],
  );

  const toggleFlag = useCallback(
    (row, col) => {
      if (gameStatus !== GAME_STATUS.PROCESS) {
        return;
      }

      const targetCell = board[row][col];

      if (targetCell.state === CELL_STATE.OPENED) {
        return;
      }

      if (targetCell.state === CELL_STATE.FLAGGED) {
        const nextBoard = board.map((rowCells, rIndex) =>
          rowCells.map((cell, cIndex) => {
            if (rIndex === row && cIndex === col) {
              return { ...cell, state: CELL_STATE.CLOSED };
            }

            return cell;
          }),
        );

        setBoard(nextBoard);
        setFlagsRemaining((prev) => prev + 1);

        if (checkWinCondition(nextBoard, rows, cols)) {
          setGameStatus(GAME_STATUS.WIN);
        }
      } else {
        if (flagsRemaining <= 0) {
          return;
        }

        const nextBoard = board.map((rowCells, rIndex) =>
          rowCells.map((cell, cIndex) => {
            if (rIndex === row && cIndex === col) {
              return { ...cell, state: CELL_STATE.FLAGGED };
            }

            return cell;
          }),
        );

        setBoard(nextBoard);
        setFlagsRemaining((prev) => prev - 1);

        if (checkWinCondition(nextBoard, rows, cols)) {
          setGameStatus(GAME_STATUS.WIN);
        }
      }
    },
    [board, flagsRemaining, gameStatus, rows, cols],
  );

  return {
    board,
    gameStatus,
    seconds,
    flagsRemaining,
    explodedCoordinates,
    rows,
    cols,
    minesCount,
    startGame,
    stopGame,
    openCell,
    toggleFlag,
  };
}
