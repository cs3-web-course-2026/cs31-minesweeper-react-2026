import { useCallback, useReducer } from 'react';

import { CELL_STATE, GAME_STATUS } from '../constants/game';
import {
  createEmptyBoard,
  generateBoard,
  restoreFlags,
} from '../utils/board';
import { openCell, toggleFlag } from '../utils/reveal';

function createInitialState() {
  return {
    board: createEmptyBoard(),
    status: GAME_STATUS.IDLE,
    explodedCell: null,
    seconds: 0,
  };
}

function gameReducer(state, action) {
  switch (action.type) {
    case 'RESTART':
      return createInitialState();

    case 'TICK':
      return { ...state, seconds: state.seconds + 1 };

    case 'OPEN_CELL': {
      const isFinished =
        state.status === GAME_STATUS.WIN || state.status === GAME_STATUS.LOSE;
      const target = state.board[action.row][action.col];

      if (isFinished || target.state === CELL_STATE.FLAGGED) {
        return state;
      }

      const board = action.freshBoard
        ? restoreFlags(action.freshBoard, state.board)
        : state.board;

      return { ...state, ...openCell(board, action.row, action.col) };
    }

    case 'TOGGLE_FLAG': {
      const canFlag =
        state.status === GAME_STATUS.IDLE ||
        state.status === GAME_STATUS.PROCESS;

      if (!canFlag) {
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
