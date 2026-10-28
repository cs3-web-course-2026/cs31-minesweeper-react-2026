import { CELL_STATE, CELL_TYPE, DEFAULT_SETTINGS, GAME_STATUS } from '../constants';
import {
  checkWinCondition, cloneBoard, countFlags, createBoard, generateMinePositions, revealSafeCells,
} from './field';

export const ACTION = { OPEN: 'open', FLAG: 'flag', RESTART: 'restart' };

/**
 * Створює нове поле зі стандартними налаштуваннями гри.
 * @returns {import('./field').Cell[][]} Нове поле 9 × 9 з 10 мінами.
 */
export function createDefaultBoard() {

  const minePositions = generateMinePositions(
    DEFAULT_SETTINGS.ROWS,
    DEFAULT_SETTINGS.COLS,
    DEFAULT_SETTINGS.MINES,
  );

  return createBoard(DEFAULT_SETTINGS.ROWS, DEFAULT_SETTINGS.COLS, minePositions);
}

/**
 * Створює початковий стан гри для переданого поля.
 * @param {import('./field').Cell[][]} board Ігрове поле.
 * @param {number} [gameId] Номер партії; змінюється при перезапуску.
 * @returns {Object} Стан гри.
 */
export function createGameState(board, gameId = 0) {

  return {
    board,
    minesCount: DEFAULT_SETTINGS.MINES,
    status: GAME_STATUS.PROCESS,
    isStarted: false,
    gameId,
  };
}

/**
 * Відкриває клітинку та визначає перемогу або поразку.
 * @param {Object} state Поточний стан гри.
 * @param {number} row Рядок клітинки.
 * @param {number} col Стовпець клітинки.
 * @returns {Object} Новий стан або той самий, якщо дія неможлива.
 */
function openCell(state, row, col) {
  const cell = state.board[row]?.[col];
  if (!cell || state.status !== GAME_STATUS.PROCESS || cell.state !== CELL_STATE.CLOSED) {

    return state;
  }

  let status = GAME_STATUS.PROCESS;
  let board;
  if (cell.type === CELL_TYPE.MINE) {
    board = cloneBoard(state.board);
    board[row][col].state = CELL_STATE.OPENED;
    status = GAME_STATUS.LOSE;
  } else {
    board = revealSafeCells(state.board, row, col);
    if (checkWinCondition(board)) {
      status = GAME_STATUS.WIN;
    }
  }

  return { ...state, board, status, isStarted: true };
}

/**
 * Ставить або знімає прапорець; кількість прапорців обмежена кількістю мін.
 * @param {Object} state Поточний стан гри.
 * @param {number} row Рядок клітинки.
 * @param {number} col Стовпець клітинки.
 * @returns {Object} Новий стан або той самий, якщо дія неможлива.
 */
function toggleFlag(state, row, col) {
  const cell = state.board[row]?.[col];
  if (!cell || state.status !== GAME_STATUS.PROCESS || cell.state === CELL_STATE.OPENED) {

    return state;
  }

  const isRemoving = cell.state === CELL_STATE.FLAGGED;
  if (!isRemoving && countFlags(state.board) >= state.minesCount) {

    return state;
  }

  const board = cloneBoard(state.board);
  board[row][col].state = isRemoving ? CELL_STATE.CLOSED : CELL_STATE.FLAGGED;

  return { ...state, board };
}

/**
 * Редуктор гри: змінює стан залежно від дії користувача.
 * @param {Object} state Поточний стан гри.
 * @param {{type: string, row?: number, col?: number, board?: Array}} action Дія.
 * @returns {Object} Новий стан гри.
 */
export function gameReducer(state, action) {
  switch (action.type) {
    case ACTION.OPEN:

      return openCell(state, action.row, action.col);
    case ACTION.FLAG:

      return toggleFlag(state, action.row, action.col);
    case ACTION.RESTART:

      return createGameState(action.board, state.gameId + 1);
    default:

      return state;
  }
}
