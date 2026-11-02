import { useCallback, useReducer } from 'react';

import { GAME_STATUS } from '../constants/game';
import { createEmptyBoard, generateBoard } from '../utils/board';
import { openCell, toggleFlag } from '../utils/reveal';

function createInitialState() {
  return {
    board: createEmptyBoard(),
    status: GAME_STATUS.IDLE,
    explodedCell: null,
    seconds: 0,
  };
}

// Редьюсер лишається чистим: нове поле приходить ззовні, в action.
function gameReducer(state, action) {
  switch (action.type) {
    case 'RESTART':
      return createInitialState();

    case 'TICK':
      return { ...state, seconds: state.seconds + 1 };

    case 'OPEN_CELL': {
      const isFinished =
        state.status === GAME_STATUS.WIN || state.status === GAME_STATUS.LOSE;

      if (isFinished) {
        return state;
      }

      const board = action.freshBoard ?? state.board;

      return { ...state, ...openCell(board, action.row, action.col) };
    }

    case 'TOGGLE_FLAG': {
      if (state.status !== GAME_STATUS.PROCESS) {
        return state;
      }

      return {
        ...state,
        board: toggleFlag(state.board, action.row, action.col),
      };
    }

    default:
      return state;
  }
}

export function useGameState() {
  const [state, dispatch] = useReducer(
    gameReducer,
    undefined,
    createInitialState,
  );

  const restart = useCallback(() => dispatch({ type: 'RESTART' }), []);

  const tick = useCallback(() => dispatch({ type: 'TICK' }), []);

  const revealCell = useCallback(
    (row, col) => {
      const freshBoard =
        state.status === GAME_STATUS.IDLE ? generateBoard(row, col) : null;

      dispatch({ type: 'OPEN_CELL', row, col, freshBoard });
    },
    [state.status],
  );

  const flagCell = useCallback(
    (row, col) => dispatch({ type: 'TOGGLE_FLAG', row, col }),
    [],
  );

  return { ...state, restart, tick, revealCell, flagCell };
}
