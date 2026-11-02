import { CELL_STATE, CELL_TYPE, GAME_STATUS } from '../constants/game';
import { cloneBoard, forEachNeighbour } from './board';
import { isBoardCleared } from './checks';

function revealMines(board) {
  board.forEach((row) => {
    row.forEach((cell) => {
      if (cell.type === CELL_TYPE.MINE) {
        cell.state = CELL_STATE.OPENED;
      }
    });
  });
}

function revealFrom(board, row, col) {
  const cell = board[row][col];

  if (cell.state !== CELL_STATE.CLOSED) {
    return;
  }

  cell.state = CELL_STATE.OPENED;

  if (cell.minesAround > 0) {
    return;
  }

  forEachNeighbour(board, row, col, (neighbour, neighbourRow, neighbourCol) => {
    if (neighbour.state === CELL_STATE.CLOSED) {
      revealFrom(board, neighbourRow, neighbourCol);
    }
  });
}

export function openCell(board, row, col) {
  const cell = board[row][col];

  if (cell.state !== CELL_STATE.CLOSED) {
    return { board, status: GAME_STATUS.PROCESS, explodedCell: null };
  }

  const nextBoard = cloneBoard(board);

  if (cell.type === CELL_TYPE.MINE) {
    revealMines(nextBoard);

    return {
      board: nextBoard,
      status: GAME_STATUS.LOSE,
      explodedCell: { row, col },
    };
  }

  revealFrom(nextBoard, row, col);

  return {
    board: nextBoard,
    status: isBoardCleared(nextBoard) ? GAME_STATUS.WIN : GAME_STATUS.PROCESS,
    explodedCell: null,
  };
}

export function toggleFlag(board, row, col) {
  const cell = board[row][col];

  if (cell.state === CELL_STATE.OPENED) {
    return board;
  }

  const nextBoard = cloneBoard(board);

  nextBoard[row][col].state =
    cell.state === CELL_STATE.FLAGGED
      ? CELL_STATE.CLOSED
      : CELL_STATE.FLAGGED;

  return nextBoard;
}
