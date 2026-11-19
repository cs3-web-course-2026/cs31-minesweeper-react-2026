import { useEffect, useRef, useState } from 'react';
import {
  CELL_STATE,
  GAME_STATUS,
  INITIAL_GAME_TIME,
  SETTINGS,
  TIMER_INTERVAL_MS,
} from './constants';
import { createBoard, getFlagsLeft, openCell, toggleFlag } from './gameLogic';

const createGameState = () => ({
  ...SETTINGS,
  status: GAME_STATUS.PROCESS,
  gameTime: INITIAL_GAME_TIME,
});

const createNewBoard = () =>
  createBoard(SETTINGS.rows, SETTINGS.cols, SETTINGS.minesCount);

export function useMinesweeper() {
  const [gameState, setGameState] = useState(createGameState);
  const [board, setBoard] = useState(createNewBoard);
  const [hasStarted, setHasStarted] = useState(false);
  const timerIdRef = useRef(null);

  const isPlaying = gameState.status === GAME_STATUS.PROCESS;
  const isTimerRunning = hasStarted && isPlaying;

  useEffect(() => {
    if (!isTimerRunning) return undefined;

    timerIdRef.current = setInterval(() => {
      setGameState((previousState) => ({
        ...previousState,
        gameTime: previousState.gameTime + 1,
      }));
    }, TIMER_INTERVAL_MS);

    return () => {
      clearInterval(timerIdRef.current);
      timerIdRef.current = null;
    };
  }, [isTimerRunning]);

  const handleOpenCell = (row, col) => {
    if (!isPlaying || board[row][col].state !== CELL_STATE.CLOSED) return;

    const result = openCell(board, row, col);
    setBoard(result.board);
    setGameState((previousState) => ({
      ...previousState,
      status: result.status,
    }));
    setHasStarted(true);
  };

  const handleToggleFlag = (row, col) => {
    if (!isPlaying) return;

    setBoard(toggleFlag(board, row, col, gameState.minesCount));
  };

  const restartGame = () => {
    setGameState(createGameState());
    setBoard(createNewBoard());
    setHasStarted(false);
  };

  return {
    board,
    cols: gameState.cols,
    status: gameState.status,
    gameTime: gameState.gameTime,
    flagsLeft: getFlagsLeft(board, gameState.minesCount),
    handleOpenCell,
    handleToggleFlag,
    restartGame,
  };
}
