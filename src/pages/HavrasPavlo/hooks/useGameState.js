import { useReducer, useCallback } from 'react';

import {
  GAME_STATUS,
  DEFAULT_CONFIG,
} from '../constants/game.js';
import { createBoard, placeMines } from '../utils/board.js';
import { checkWinCondition, countFlags } from '../utils/checks.js';
import { revealCell, toggleFlagAt } from '../utils/reveal.js';


function createInitialState(config = DEFAULT_CONFIG) {
  return {
    board: createBoard(config.rows, config.cols),
    gameStatus: GAME_STATUS.IDLE,
    flagsCount: 0,
    config,
  };
}


function gameReducer(state, action) {
  switch (action.type) {
    case 'RESTART': {
      return createInitialState(state.config);
    }

    case 'REVEAL_CELL': {
      if (
        state.gameStatus === GAME_STATUS.WON ||
        state.gameStatus === GAME_STATUS.LOST
      ) {
        return state;
      }

      let currentBoard = state.board;
      let nextStatus = state.gameStatus;

      // При першому кліку генеруємо міни з виключенням першої клітинки
      if (state.gameStatus === GAME_STATUS.IDLE) {
        currentBoard = createBoard(state.config.rows, state.config.cols);
        placeMines(
          currentBoard,
          state.config.rows,
          state.config.cols,
          state.config.mineCount,
          action.row,
          action.col,
        );
        nextStatus = GAME_STATUS.PLAYING;
      }

      const { updatedBoard, hitMine } = revealCell(
        currentBoard,
        action.row,
        action.col,
      );

      if (hitMine) {
        return {
          ...state,
          board: updatedBoard,
          gameStatus: GAME_STATUS.LOST,
        };
      }

      const isWon = checkWinCondition(
        updatedBoard,
        state.config.rows,
        state.config.cols,
        state.config.mineCount,
      );

      return {
        ...state,
        board: updatedBoard,
        gameStatus: isWon ? GAME_STATUS.WON : nextStatus,
        flagsCount: countFlags(updatedBoard),
      };
    }

    case 'TOGGLE_FLAG': {
      if (
        state.gameStatus === GAME_STATUS.WON ||
        state.gameStatus === GAME_STATUS.LOST
      ) {
        return state;
      }

      const updatedBoard = toggleFlagAt(state.board, action.row, action.col);

      return {
        ...state,
        board: updatedBoard,
        flagsCount: countFlags(updatedBoard),
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

  const revealCellAt = useCallback((row, col) => {
    dispatch({ type: 'REVEAL_CELL', row, col });
  }, []);

  const toggleFlagAtCoords = useCallback((row, col) => {
    dispatch({ type: 'TOGGLE_FLAG', row, col });
  }, []);

  const restartGame = useCallback(() => {
    dispatch({ type: 'RESTART' });
  }, []);

  return {
    board: state.board,
    gameStatus: state.gameStatus,
    flagsCount: state.flagsCount,
    config: state.config,
    revealCell: revealCellAt,
    toggleFlag: toggleFlagAtCoords,
    restartGame,
  };
}
