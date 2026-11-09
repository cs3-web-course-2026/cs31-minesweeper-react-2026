import {
  GAME_ACTION,
  GAME_CONFIG,
  GAME_STATUS,
  MAX_TIMER_SECONDS,
} from '../constants/game';
import { createBoard, placeMines } from '../utils/board';
import { checkWinCondition, hasAnyMines, hasRevealedMine } from '../utils/checks';
import { revealAllMines, revealCell, toggleFlag } from '../utils/reveal';

export function createInitialState(config = GAME_CONFIG) {
  return {
    board: createBoard(config.rows, config.cols),
    gameStatus: GAME_STATUS.IDLE,
    elapsedSeconds: 0,
    config,
  };
}

function isGameOver(gameStatus) {
  return gameStatus === GAME_STATUS.WON || gameStatus === GAME_STATUS.LOST;
}

function handleReveal(state, { row, col }) {
  if (isGameOver(state.gameStatus)) {
    return state;
  }

  // Mines are placed on the first reveal so that it can never hit a mine.
  const preparedBoard = hasAnyMines(state.board)
    ? state.board
    : placeMines(state.board, state.config.mineCount, row, col);
  const revealedBoard = revealCell(preparedBoard, row, col);

  if (revealedBoard === preparedBoard && preparedBoard === state.board) {
    return state;
  }

  if (hasRevealedMine(revealedBoard)) {
    return {
      ...state,
      board: revealAllMines(revealedBoard),
      gameStatus: GAME_STATUS.LOST,
    };
  }

  return {
    ...state,
    board: revealedBoard,
    gameStatus: checkWinCondition(revealedBoard)
      ? GAME_STATUS.WON
      : GAME_STATUS.PLAYING,
  };
}

function handleToggleFlag(state, { row, col }) {
  if (isGameOver(state.gameStatus)) {
    return state;
  }

  return { ...state, board: toggleFlag(state.board, row, col) };
}

function handleTick(state) {
  if (state.gameStatus !== GAME_STATUS.PLAYING) {
    return state;
  }

  return {
    ...state,
    elapsedSeconds: Math.min(state.elapsedSeconds + 1, MAX_TIMER_SECONDS),
  };
}

export function gameReducer(state, action) {
  switch (action.type) {
    case GAME_ACTION.REVEAL_CELL:
      return handleReveal(state, action);
    case GAME_ACTION.TOGGLE_FLAG:
      return handleToggleFlag(state, action);
    case GAME_ACTION.TICK:
      return handleTick(state);
    case GAME_ACTION.RESTART:
      return createInitialState(state.config);
    default:
      return state;
  }
}