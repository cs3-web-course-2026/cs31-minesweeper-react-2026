import { useCallback, useReducer } from 'react';

import { GAME_ACTION, GAME_STATUS } from '../constants/game';
import { countFlags } from '../utils/checks';

import { createInitialState, gameReducer } from './gameReducer';
import { useTimer } from './useTimer';

export function useGameState() {
  const [state, dispatch] = useReducer(
    gameReducer,
    undefined,
    createInitialState,
  );

  const handleTick = useCallback(
    () => dispatch({ type: GAME_ACTION.TICK }),
    [],
  );

  useTimer(state.gameStatus === GAME_STATUS.PLAYING, handleTick);

  const revealCell = useCallback(
    (row, col) => dispatch({ type: GAME_ACTION.REVEAL_CELL, row, col }),
    [],
  );

  const toggleFlag = useCallback(
    (row, col) => dispatch({ type: GAME_ACTION.TOGGLE_FLAG, row, col }),
    [],
  );

  const restart = useCallback(
    () => dispatch({ type: GAME_ACTION.RESTART }),
    [],
  );

  return {
    board: state.board,
    gameStatus: state.gameStatus,
    elapsedSeconds: state.elapsedSeconds,
    minesRemaining: state.config.mineCount - countFlags(state.board),
    revealCell,
    toggleFlag,
    restart,
  };
}