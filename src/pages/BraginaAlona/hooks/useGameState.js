import { useReducer } from 'react';

import {
  GAME_CONFIG,
  GAME_STATUS,
  CELL_STATE,
} from '../constants/game';

import {
  createBoard,
  generateMinePositions,
} from '../utils/board';

import { revealCell } from '../utils/reveal';

import {
  checkWin,
  countFlags,
  isMine,
} from '../utils/checks';

// Початковий стан гри
function createInitialState() {
  const minePositions = generateMinePositions(
    GAME_CONFIG.ROWS,
    GAME_CONFIG.COLS,
    GAME_CONFIG.MINE_COUNT,
  );

  return {
    board: createBoard(
      GAME_CONFIG.ROWS,
      GAME_CONFIG.COLS,
      minePositions,
    ),
    status: GAME_STATUS.IDLE,
  };
}

// Обробляє всі дії гравця
function gameReducer(state, action) {
  // Перезапуск гри
  if (action.type === 'RESTART') {
    return createInitialState();
  }

  // Після завершення гри дії недоступні
  if (
    state.status === GAME_STATUS.WON ||
    state.status === GAME_STATUS.LOST
  ) {
    return state;
  }

  // Встановлення або зняття прапорця
  if (action.type === 'TOGGLE_FLAG') {
    const { row, col } = action;

    const cell = state.board[row][col];

    if (cell.state === CELL_STATE.OPEN) {
      return state;
    }

    if (
      cell.state === CELL_STATE.CLOSED &&
      countFlags(state.board) >= GAME_CONFIG.MINE_COUNT
    ) {
      return state;
    }

    const newBoard = state.board.map((boardRow, rowIndex) =>
      boardRow.map((boardCell, colIndex) => {
        if (rowIndex !== row || colIndex !== col) {
          return boardCell;
        }

        return {
          ...boardCell,
          state:
            boardCell.state === CELL_STATE.FLAGGED
              ? CELL_STATE.CLOSED
              : CELL_STATE.FLAGGED,
        };
      }),
    );

    return {
      ...state,
      board: newBoard,
    };
  }

  // Відкриття клітинки
  if (action.type === 'REVEAL_CELL') {
    const { row, col } = action;

    const cell = state.board[row][col];

    if (cell.state !== CELL_STATE.CLOSED) {
      return state;
    }

    const newBoard = revealCell(state.board, row, col);

    // Перевіряємо, чи була відкрита міна
    if (isMine(newBoard[row][col])) {
      return {
        board: newBoard,
        status: GAME_STATUS.LOST,
      };
    }

    // Перевіряємо перемогу
    const hasWon = checkWin(newBoard);

    return {
      board: newBoard,
      status: hasWon
        ? GAME_STATUS.WON
        : GAME_STATUS.PLAYING,
    };
  }

  return state;
}

// React Hook для керування грою
export function useGameState() {
  const [state, dispatch] = useReducer(
    gameReducer,
    undefined,
    createInitialState,
  );

  return {
    board: state.board,
    status: state.status,
    dispatch,
    restartGame: () => dispatch({ type: 'RESTART' }),
  };
}