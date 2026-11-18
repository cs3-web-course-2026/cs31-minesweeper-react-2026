import { useCallback, useReducer } from 'react';

import { GAME_ACTION, GAME_CONFIG } from '../constants/game';
import { countFlags } from '../utils/board';
import {
  createInitialState,
  gameReducer,
  isGameFinished,
} from '../utils/gameReducer';
import useTimer from './useTimer';

export default function useGameState() {
  const [state, dispatch] = useReducer(
    gameReducer,
    undefined,
    createInitialState,
  );

  useTimer(state.status, state.roundId, dispatch);

  const sendCellAction = useCallback(
    (type, row, col) => {
      // Випадковість і час надходять з обробника дії; reducer залишається чистим.
      const randomValues =
        type === GAME_ACTION.REVEAL && !state.minesPlaced
          ? Array.from({ length: GAME_CONFIG.minesCount }, () => Math.random())
          : [];
      dispatch({ type, row, col, randomValues, timestamp: performance.now() });
    },
    [state.minesPlaced],
  );

  const reveal = useCallback(
    (row, col) => {
      sendCellAction(GAME_ACTION.REVEAL, row, col);
    },
    [sendCellAction],
  );

  const flag = useCallback(
    (row, col) => {
      sendCellAction(GAME_ACTION.FLAG, row, col);
    },
    [sendCellAction],
  );

  const restart = useCallback(
    () => dispatch({ type: GAME_ACTION.RESTART }),
    [],
  );
  const toggleFlagMode = useCallback(
    () => dispatch({ type: GAME_ACTION.TOGGLE_FLAG_MODE }),
    [],
  );

  return {
    state,
    remainingFlags: GAME_CONFIG.minesCount - countFlags(state.board),
    isFinished: isGameFinished(state.status),
    reveal,
    flag,
    restart,
    toggleFlagMode,
  };
}
