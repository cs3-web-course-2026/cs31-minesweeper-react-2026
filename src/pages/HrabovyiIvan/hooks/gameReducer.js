import {
  CELL_CONTENT,
  CELL_STATE,
  DEFAULT_CONFIG,
  GAME_ACTION,
  GAME_STATUS,
} from '../constants/game';
import { createBoard, ensureSafeFirstReveal } from '../utils/board';
import {
  checkWinCondition,
  countRemainingFlags,
  isGameFinished,
} from '../utils/checks';
import { flagAllMines, toggleFlag } from '../utils/flags';
import { revealAllMines, revealCell } from '../utils/reveal';

export function createInitialState(config = DEFAULT_CONFIG) {
  return {
    board: createBoard(config.rows, config.cols, config.mineCount),
    gameStatus: GAME_STATUS.IDLE,
    elapsedSeconds: 0,
    explodedPosition: null,
    config,
  };
}

function reduceRevealCell(state, row, col) {
  if (
    isGameFinished(state.gameStatus) ||
    state.board[row][col].state !== CELL_STATE.CLOSED
  ) {
    return state;
  }

  const startingBoard =
    state.gameStatus === GAME_STATUS.IDLE
      ? ensureSafeFirstReveal(state.board, row, col)
      : state.board;
  const revealedBoard = revealCell(startingBoard, row, col);

  if (revealedBoard[row][col].content === CELL_CONTENT.MINE) {
    return {
      ...state,
      board: revealAllMines(revealedBoard),
      gameStatus: GAME_STATUS.LOST,
      explodedPosition: { row, col },
    };
  }

  if (checkWinCondition(revealedBoard)) {
    return {
      ...state,
      board: flagAllMines(revealedBoard),
      gameStatus: GAME_STATUS.WON,
    };
  }

  return { ...state, board: revealedBoard, gameStatus: GAME_STATUS.PLAYING };
}

function reduceToggleFlag(state, row, col) {
  if (isGameFinished(state.gameStatus)) {
    return state;
  }

  const isPlacingFlag = state.board[row][col].state === CELL_STATE.CLOSED;
  const hasNoFlagsLeft =
    countRemainingFlags(state.board, state.config.mineCount) <= 0;

  if (isPlacingFlag && hasNoFlagsLeft) {
    return state;
  }

  return { ...state, board: toggleFlag(state.board, row, col) };
}

export function gameReducer(state, action) {
  switch (action.type) {
    case GAME_ACTION.REVEAL_CELL:
      return reduceRevealCell(state, action.row, action.col);
    case GAME_ACTION.TOGGLE_FLAG:
      return reduceToggleFlag(state, action.row, action.col);
    case GAME_ACTION.TICK:
      return state.gameStatus === GAME_STATUS.PLAYING
        ? { ...state, elapsedSeconds: state.elapsedSeconds + 1 }
        : state;
    case GAME_ACTION.RESTART:
      return createInitialState(state.config);
    default:
      return state;
  }
}
