import { useEffect, useReducer } from 'react';

import {
  BOARD_CONFIG,
  CELL_STATE,
  CELL_TYPE,
  GAME_STATUS,
  TIMER_CONFIG,
} from '../constants/game';
import {
  createBoard,
  placeMines,
  calculateAdjacency,
} from '../utils/board';
import { revealCell } from '../utils/reveal';
import {
  checkWinCondition,
  countFlags,
  isInBounds,
} from '../utils/checks';

const GAME_ACTION = {
  REVEAL_CELL: 'reveal-cell',
  TOGGLE_FLAG: 'toggle-flag',
  RESTART: 'restart',
  TICK: 'tick',
};

function createInitialState() {
  return {
    board: createBoard(BOARD_CONFIG.ROWS, BOARD_CONFIG.COLS),
    gameStatus: GAME_STATUS.IDLE,
    seconds: 0,
  };
}

function toggleFlag(board, targetRow, targetCol) {
  return board.map((boardRow, row) =>
    boardRow.map((cell, col) => {
      if (row !== targetRow || col !== targetCol) {
        return cell;
      }

      return {
        ...cell,
        state:
          cell.state === CELL_STATE.FLAGGED
            ? CELL_STATE.CLOSED
            : CELL_STATE.FLAGGED,
      };
    }),
  );
}

function gameReducer(state, action) {
  switch (action.type) {
    case GAME_ACTION.RESTART:
      return createInitialState();

    case GAME_ACTION.TOGGLE_FLAG: {
      const { row, col } = action;

      if (
        state.gameStatus === GAME_STATUS.WON ||
        state.gameStatus === GAME_STATUS.LOST ||
        !isInBounds(state.board, row, col)
      ) {
        return state;
      }

      const cell = state.board[row][col];

      if (cell.state === CELL_STATE.OPEN) {
        return state;
      }

      if (
        cell.state === CELL_STATE.CLOSED &&
        countFlags(state.board) >= BOARD_CONFIG.MINE_COUNT
      ) {
        return state;
      }

      return {
        ...state,
        board: toggleFlag(state.board, row, col),
      };
    }

    case GAME_ACTION.REVEAL_CELL: {
      const { row, col } = action;

      if (
        state.gameStatus === GAME_STATUS.WON ||
        state.gameStatus === GAME_STATUS.LOST ||
        !isInBounds(state.board, row, col) ||
        state.board[row][col].state !== CELL_STATE.CLOSED
      ) {
        return state;
      }

      let currentBoard = state.board;

      if (state.gameStatus === GAME_STATUS.IDLE) {
        currentBoard = action.initializedBoard ?? currentBoard;
      }

      const clickedCell = currentBoard[row][col];
      const updatedBoard = revealCell(currentBoard, row, col);

      let gameStatus = GAME_STATUS.PLAYING;

      if (clickedCell.type === CELL_TYPE.MINE) {
        gameStatus = GAME_STATUS.LOST;
      } else if (checkWinCondition(updatedBoard)) {
        gameStatus = GAME_STATUS.WON;
      }

      return {
        ...state,
        board: updatedBoard,
        gameStatus,
      };
    }

    case GAME_ACTION.TICK:
      if (state.gameStatus !== GAME_STATUS.PLAYING) {
        return state;
      }

      return {
        ...state,
        seconds: state.seconds + 1,
      };

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

  useEffect(() => {
    if (state.gameStatus !== GAME_STATUS.PLAYING) {
      return undefined;
    }

    const timerId = window.setInterval(() => {
      dispatch({ type: GAME_ACTION.TICK });
    }, TIMER_CONFIG.INTERVAL_MS);

    return () => window.clearInterval(timerId);
  }, [state.gameStatus]);

  const handleCellClick = (row, col) => {
    const initializedBoard =
      state.gameStatus === GAME_STATUS.IDLE &&
      isInBounds(state.board, row, col) &&
      state.board[row][col].state === CELL_STATE.CLOSED
        ? calculateAdjacency(
          placeMines(
            state.board,
            BOARD_CONFIG.MINE_COUNT,
            row,
            col,
          ),
        )
        : null;

    dispatch({
      type: GAME_ACTION.REVEAL_CELL,
      row,
      col,
      initializedBoard,
    });
  };

  const handleCellRightClick = (row, col) => {
    dispatch({ type: GAME_ACTION.TOGGLE_FLAG, row, col });
  };

  const handleRestart = () => {
    dispatch({ type: GAME_ACTION.RESTART });
  };

  const remainingFlags =
    BOARD_CONFIG.MINE_COUNT - countFlags(state.board);

  return {
    board: state.board,
    gameStatus: state.gameStatus,
    seconds: state.seconds,
    remainingFlags,
    handleCellClick,
    handleCellRightClick,
    handleRestart,
  };
}
