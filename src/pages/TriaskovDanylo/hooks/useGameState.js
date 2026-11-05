import { useCallback, useReducer } from 'react';

import {
  DEFAULT_CONFIG,
  GAME_ACTION,
  GAME_STATUS,
} from '../constants/game';
import { generateField } from '../utils/board';
import { getFlaggedCellsCount } from '../utils/checks';
import { openCellAt, toggleFlagAt } from '../utils/reveal';


function createInitialState(config = DEFAULT_CONFIG) {
  return {
    board: generateField(config.rows, config.cols, config.minesCount),
    status: GAME_STATUS.PROCESS,
    isRunning: false,
    config,
  };
}


function gameReducer(state, action) {
  switch (action.type) {
    case GAME_ACTION.START_GAME: {
      if (state.status !== GAME_STATUS.PROCESS) {
        return state;
      }

      return {
        ...state,
        isRunning: true,
      };
    }

    case GAME_ACTION.RESTART_GAME: {
      return createInitialState(state.config);
    }

    case GAME_ACTION.OPEN_CELL: {
      if (state.status !== GAME_STATUS.PROCESS) {
        return state;
      }

      const { board, status, hasChanged } = openCellAt(
        state.board,
        action.row,
        action.col,
      );

      if (!hasChanged) {
        return state;
      }

      return {
        ...state,
        board,
        status,
        isRunning: true,
      };
    }

    case GAME_ACTION.TOGGLE_FLAG: {
      if (state.status !== GAME_STATUS.PROCESS) {
        return state;
      }

      const updatedBoard = toggleFlagAt(
        state.board,
        action.row,
        action.col,
        state.config.minesCount,
      );

      return {
        ...state,
        board: updatedBoard,
      };
    }

    default:
      return state;
  }
}


export function useGameState(config = DEFAULT_CONFIG) {
  const [state, dispatch] = useReducer(
    gameReducer,
    config,
    createInitialState,
  );

  const openCell = useCallback((row, col) => {
    dispatch({ type: GAME_ACTION.OPEN_CELL, row, col });
  }, []);

  const toggleFlag = useCallback((row, col) => {
    dispatch({ type: GAME_ACTION.TOGGLE_FLAG, row, col });
  }, []);

  const startGame = useCallback(() => {
    dispatch({ type: GAME_ACTION.START_GAME });
  }, []);

  const restartGame = useCallback(() => {
    dispatch({ type: GAME_ACTION.RESTART_GAME });
  }, []);

  const remainingFlags =
    state.config.minesCount - getFlaggedCellsCount(state.board);

  return {
    board: state.board,
    status: state.status,
    isRunning: state.isRunning,
    remainingFlags,
    openCell,
    toggleFlag,
    startGame,
    restartGame,
  };
}
