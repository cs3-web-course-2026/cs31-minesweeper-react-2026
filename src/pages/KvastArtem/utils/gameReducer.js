import {
  CELL_STATE,
  CELL_TYPE,
  GAME_ACTION,
  GAME_CONFIG,
  GAME_STATUS,
  MILLISECONDS_PER_SECOND,
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
    startedAt: null,
    minesPlaced: false,
    flagMode: false,
    roundId,
  };
}

function isValidTimestamp(timestamp) {
  return Number.isFinite(timestamp) && timestamp >= 0;
}

function calculateElapsedSeconds(
  state,
  timestamp,
  startedAt = state.startedAt,
) {
  return Math.max(
    state.elapsedSeconds,
    Math.floor((timestamp - startedAt) / MILLISECONDS_PER_SECOND),
  );
}

function prepareBoard(state, action) {
  if (state.minesPlaced || action.type !== GAME_ACTION.REVEAL) {
    return state.board;
  }

  const generatedBoard = createBoard(GAME_CONFIG, action.randomValues, {
    row: action.row,
    col: action.col,
  });

  return generatedBoard.map((cells, row) =>
    cells.map((cell, col) => ({
      ...cell,
      state: state.board[row][col].state,
    })),
  );
}

function applyCellAction(state, action) {
  const { row, col } = action;

  if (
    isGameFinished(state.status) ||
    !isInBounds(state.board, row, col) ||
    !isValidTimestamp(action.timestamp)
  ) {
    return state;
  }

  const cell = state.board[row][col];

  if (
    cell.state === CELL_STATE.OPENED ||
    (action.type === GAME_ACTION.REVEAL && cell.state === CELL_STATE.FLAGGED)
  ) {
    return state;
  }

  const board = prepareBoard(state, action);
  const nextBoard =
    action.type === GAME_ACTION.REVEAL
      ? revealCell(board, row, col)
      : toggleFlag(board, row, col, GAME_CONFIG.minesCount);

  if (nextBoard === board) {
    return state;
  }

  let status = GAME_STATUS.PLAYING;
  const minesPlaced = state.minesPlaced || action.type === GAME_ACTION.REVEAL;

  if (
    nextBoard[row][col].type === CELL_TYPE.MINE &&
    action.type === GAME_ACTION.REVEAL
  ) {
    status = GAME_STATUS.LOST;
  } else if (minesPlaced && checkWinCondition(nextBoard)) {
    status = GAME_STATUS.WON;
  }

  const startedAt = state.startedAt ?? action.timestamp;

  return {
    ...state,
    board: nextBoard,
    status,
    minesPlaced,
    startedAt,
    elapsedSeconds: calculateElapsedSeconds(state, action.timestamp, startedAt),
  };
}

export function gameReducer(state, action) {
  switch (action.type) {
    case GAME_ACTION.REVEAL:
    case GAME_ACTION.FLAG:
      return applyCellAction(state, action);
    case GAME_ACTION.TICK:
      if (
        state.status !== GAME_STATUS.PLAYING ||
        state.roundId !== action.roundId ||
        !isValidTimestamp(action.timestamp)
      ) {
        return state;
      }

      return {
        ...state,
        elapsedSeconds: calculateElapsedSeconds(state, action.timestamp),
      };
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
