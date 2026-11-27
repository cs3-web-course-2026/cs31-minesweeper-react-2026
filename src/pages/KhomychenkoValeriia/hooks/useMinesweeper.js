import { useState, useEffect, useCallback } from 'react';
import {
  GAME_CONFIG,
  GAME_STATUS,
  CELL_STATE,
  CELL_TYPE,
} from '../constants/game';
import {
  generateField,
  cloneBoard,
  revealRecursive,
  checkWin,
} from '../utils/board';

export function useMinesweeper() {
  const { ROWS, COLS, MINES_COUNT, MAX_TIME } = GAME_CONFIG;

  const [board, setBoard] = useState(() =>
    generateField(ROWS, COLS, MINES_COUNT),
  );
  const [status, setStatus] = useState(GAME_STATUS.PROCESS);
  const [gameTime, setGameTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [flagsPlaced, setFlagsPlaced] = useState(0);
  const [isFirstClick, setIsFirstClick] = useState(true);

  useEffect(() => {
    if (!isRunning || status !== GAME_STATUS.PROCESS) return undefined;

    const timerId = setInterval(() => {
      setGameTime((prevTime) =>
        prevTime >= MAX_TIME ? MAX_TIME : prevTime + 1,
      );
    }, 1000);

    return () => clearInterval(timerId);
  }, [isRunning, status, MAX_TIME]);

  const restartGame = useCallback(() => {
    setBoard(generateField(ROWS, COLS, MINES_COUNT));
    setStatus(GAME_STATUS.PROCESS);
    setGameTime(0);
    setIsRunning(false);
    setFlagsPlaced(0);
    setIsFirstClick(true);
  }, [ROWS, COLS, MINES_COUNT]);

  const handleOpenCell = useCallback(
    (row, col) => {
      if (status !== GAME_STATUS.PROCESS) return;

      let workingBoard = cloneBoard(board);
      let targetCell = workingBoard[row][col];

      if (
        targetCell.state === CELL_STATE.OPENED ||
        targetCell.state === CELL_STATE.FLAGGED
      ) {
        return;
      }

      if (isFirstClick) {
        setIsFirstClick(false);
        setIsRunning(true);

        while (
          workingBoard[row][col].type === CELL_TYPE.MINE ||
          workingBoard[row][col].neighborMines > 0
        ) {
          workingBoard = generateField(ROWS, COLS, MINES_COUNT);
        }
        setFlagsPlaced(0);
        targetCell = workingBoard[row][col];
      }

      if (targetCell.type === CELL_TYPE.MINE) {
        for (let rIdx = 0; rIdx < ROWS; rIdx += 1) {
          for (let cIdx = 0; cIdx < COLS; cIdx += 1) {
            if (workingBoard[rIdx][cIdx].type === CELL_TYPE.MINE) {
              workingBoard[rIdx][cIdx].state = CELL_STATE.OPENED;
              if (rIdx === row && cIdx === col) {
                workingBoard[rIdx][cIdx].isExploded = true;
              }
            }
          }
        }
        setBoard(workingBoard);
        setStatus(GAME_STATUS.LOSE);
        setIsRunning(false);
        return;
      }

      revealRecursive(workingBoard, row, col, ROWS, COLS);
      setBoard(workingBoard);

      if (checkWin(workingBoard, ROWS, COLS, MINES_COUNT)) {
        setStatus(GAME_STATUS.WIN);
        setIsRunning(false);
      }
    },
    [board, status, isFirstClick, ROWS, COLS, MINES_COUNT],
  );

  const handleToggleFlag = useCallback(
    (row, col) => {
      if (status !== GAME_STATUS.PROCESS) return;

      const workingBoard = cloneBoard(board);
      const targetCell = workingBoard[row][col];

      if (targetCell.state === CELL_STATE.OPENED) return;

      if (targetCell.state === CELL_STATE.CLOSED) {
        targetCell.state = CELL_STATE.FLAGGED;
        setFlagsPlaced((prev) => prev + 1);
      } else if (targetCell.state === CELL_STATE.FLAGGED) {
        targetCell.state = CELL_STATE.CLOSED;
        setFlagsPlaced((prev) => prev - 1);
      }

      setBoard(workingBoard);
    },
    [board, status],
  );

  return {
    board,
    rows: ROWS,
    cols: COLS,
    minesRemaining: MINES_COUNT - flagsPlaced,
    gameTime,
    status,
    handleOpenCell,
    handleToggleFlag,
    restartGame,
  };
}
