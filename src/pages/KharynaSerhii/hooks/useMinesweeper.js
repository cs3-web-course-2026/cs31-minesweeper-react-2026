import { useReducer } from 'react';
import { countFlags } from '../logic/field';
import {
  ACTION, createDefaultBoard, createGameState, gameReducer,
} from '../logic/gameReducer';

/**
 * Зберігає стан гри та надає дії для компонентів.
 * @returns {Object} Поле, статус, лічильник прапорців і функції керування.
 */
export function useMinesweeper() {
  const [state, dispatch] = useReducer(
    gameReducer,
    undefined,
    () => createGameState(createDefaultBoard()),
  );

  return {
    board: state.board,
    status: state.status,
    isStarted: state.isStarted,
    gameId: state.gameId,
    flagsLeft: state.minesCount - countFlags(state.board),
    openCell: (row, col) => dispatch({ type: ACTION.OPEN, row, col }),
    toggleFlag: (row, col) => dispatch({ type: ACTION.FLAG, row, col }),
    restart: () => dispatch({ type: ACTION.RESTART, board: createDefaultBoard() }),
  };
}
