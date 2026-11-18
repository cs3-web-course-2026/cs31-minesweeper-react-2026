import {
  CELL_STATE,
  CELL_TYPE,
  GAME_ACTION,
  GAME_CONFIG,
  GAME_STATUS,
} from '../constants/game.js';
import {
  checkWinCondition,
  createBoard,
  createEmptyBoard,
  isInBounds,
  revealCell,
  toggleFlag,
} from './board.js';

export function isGameFinished(status) {
  return status === GAME_STATUS.WON || status === GAME_STATUS.LOST;
}

export function createInitialState(roundId = 0) {
  return {
    board: createEmptyBoard(GAME_CONFIG.rows, GAME_CONFIG.cols),
    status: GAME_STATUS.IDLE,
    elapsedSeconds: 0,
    flagMode: false,
    roundId,
  };
}

function applyCellAction(state, action) {
  const { row, col } = action;

  if (isGameFinished(state.status) || !isInBounds(state.board, row, col)) {
    return state;
  }

  const cell = state.board[row][col];

  if (
    cell.state === CELL_STATE.OPENED ||
    (action.type === GAME_ACTION.REVEAL && cell.state === CELL_STATE.FLAGGED)
  ) {
    return state;
  }

  const board =
    state.status === GAME_STATUS.IDLE
      ? createBoard(GAME_CONFIG, action.randomValues)
      : state.board;
  const nextBoard =
    action.type === GAME_ACTION.REVEAL
      ? revealCell(board, row, col)
      : toggleFlag(board, row, col, GAME_CONFIG.minesCount);

  if (nextBoard === board) {
    return state;
  }

  let status = GAME_STATUS.PLAYING;

  if (
    nextBoard[row][col].type === CELL_TYPE.MINE &&
    action.type === GAME_ACTION.REVEAL
  ) {
    status = GAME_STATUS.LOST;
  } else if (checkWinCondition(nextBoard)) {
    status = GAME_STATUS.WON;
  }

  return { ...state, board: nextBoard, status };
}

export function gameReducer(state, action) {
  switch (action.type) {
    case GAME_ACTION.REVEAL:
    case GAME_ACTION.FLAG:
      return applyCellAction(state, action);
    case GAME_ACTION.TICK:
      if (
        state.status !== GAME_STATUS.PLAYING ||
        state.roundId !== action.roundId
      ) {
        return state;
      }

      return { ...state, elapsedSeconds: state.elapsedSeconds + 1 };
    case GAME_ACTION.RESTART:
      return createInitialState(state.roundId + 1);
    case GAME_ACTION.TOGGLE_FLAG_MODE:
      if (isGameFinished(state.status)) {
        return state;
      }

      return { ...state, flagMode: !state.flagMode };
    default:
      return state;
  }
}
