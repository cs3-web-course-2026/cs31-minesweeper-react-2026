import { useCallback, useReducer } from 'react';

import { GAME_ACTION, GAME_STATUS } from '../constants/game';
import { countRemainingFlags } from '../utils/checks';

import { createInitialState, gameReducer } from './gameReducer';
import { useTimer } from './useTimer';

export function useGameState() {
  const [state, dispatch] = useReducer(
    gameReducer,
    undefined,
    createInitialState,
  );

  const revealCellAt = useCallback(
    (row, col) => dispatch({ type: GAME_ACTION.REVEAL_CELL, row, col }),
    [],
  );

  const toggleFlagAt = useCallback(
    (row, col) => dispatch({ type: GAME_ACTION.TOGGLE_FLAG, row, col }),
    [],
  );

  const restart = useCallback(
    () => dispatch({ type: GAME_ACTION.RESTART }),
    [],
  );

  const tick = useCallback(() => dispatch({ type: GAME_ACTION.TICK }), []);

  useTimer(state.gameStatus === GAME_STATUS.PLAYING, tick);

  return {
    board: state.board,
    gameStatus: state.gameStatus,
    elapsedSeconds: state.elapsedSeconds,
    explodedPosition: state.explodedPosition,
    remainingFlags: countRemainingFlags(state.board, state.config.mineCount),
    revealCellAt,
    toggleFlagAt,
    restart,
  };
}
