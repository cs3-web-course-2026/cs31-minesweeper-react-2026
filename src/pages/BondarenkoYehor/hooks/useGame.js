import { useCallback, useMemo, useReducer } from 'react';
import { countFlags } from '../game/board';
import { GAME_STATUS } from '../game/constants';
import { ACTIONS, createInitialState, gameReducer } from '../game/gameReducer';
import { useTimer } from './useTimer';

export function useGame() {
  const [state, dispatch] = useReducer(gameReducer, undefined, () => createInitialState());
  const { board, status, isStarted, gameId } = state;

  const seconds = useTimer(isStarted && status === GAME_STATUS.PROCESS, gameId);
  const flagsCount = useMemo(() => countFlags(board), [board]);

  const openCell = useCallback((row, col) => dispatch({ type: ACTIONS.OPEN, row, col }), []);
  const toggleFlag = useCallback((row, col) => dispatch({ type: ACTIONS.FLAG, row, col }), []);
  const restart = useCallback(() => dispatch({ type: ACTIONS.RESTART }), []);

  return { ...state, seconds, flagsCount, openCell, toggleFlag, restart };
}
