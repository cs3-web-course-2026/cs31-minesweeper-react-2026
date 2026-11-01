import { createBoard, hasWon, revealCells, toggleFlagAt } from './board';
import { CELL_STATE, CELL_TYPE, DEFAULT_SETTINGS, GAME_STATUS } from './constants';

export const ACTIONS = { OPEN: 'open', FLAG: 'flag', RESTART: 'restart' };

export function createInitialState(settings = DEFAULT_SETTINGS, gameId = 0) {
  return {
    settings,
    gameId,
    board: createBoard(settings),
    status: GAME_STATUS.PROCESS,
    isStarted: false,
    explodedCell: null,
  };
}

function openCell(state, { row, col }) {
  const cell = state.board[row][col];
  if (cell.state !== CELL_STATE.CLOSED) return state;

  if (cell.type === CELL_TYPE.MINE) {
    return { ...state, isStarted: true, status: GAME_STATUS.LOSE, explodedCell: { row, col } };
  }

  const board = revealCells(state.board, row, col);
  return {
    ...state,
    board,
    isStarted: true,
    status: hasWon(board) ? GAME_STATUS.WIN : GAME_STATUS.PROCESS,
  };
}

function toggleFlag(state, { row, col }) {
  const board = toggleFlagAt(state.board, row, col, state.settings.minesCount);
  return { ...state, board, isStarted: true };
}

export function gameReducer(state, action) {
  if (action.type === ACTIONS.RESTART) {
    return createInitialState(action.settings ?? state.settings, state.gameId + 1);
  }
  if (state.status !== GAME_STATUS.PROCESS) return state;

  switch (action.type) {
    case ACTIONS.OPEN:
      return openCell(state, action);
    case ACTIONS.FLAG:
      return toggleFlag(state, action);
    default:
      return state;
  }
}
