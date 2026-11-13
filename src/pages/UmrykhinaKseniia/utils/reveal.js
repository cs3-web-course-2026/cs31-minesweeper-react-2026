import { CELL_STATE } from '../constants/game';

import { getNeighbourPositions } from './board';

function updateCell(board, row, col, changes) {
  return board.map((boardRow, rowIndex) =>
    rowIndex === row
      ? boardRow.map((cell, colIndex) =>
          colIndex === col ? { ...cell, ...changes } : cell,
        )
      : boardRow,
  );
}

export function toggleFlag(board, row, col) {
  const { state } = board[row][col];

  if (state === CELL_STATE.OPEN) {
    return board;
  }

  const nextState =
    state === CELL_STATE.FLAGGED ? CELL_STATE.CLOSED : CELL_STATE.FLAGGED;

  return updateCell(board, row, col, { state: nextState });
}

// Opens the cell; empty cells spread to their neighbours (flood fill).
export function revealCell(board, row, col) {
  if (board[row][col].state !== CELL_STATE.CLOSED) {
    return board;
  }

  let nextBoard = updateCell(board, row, col, { state: CELL_STATE.OPEN });
  const revealedCell = nextBoard[row][col];

  if (revealedCell.hasMine || revealedCell.adjacentMines > 0) {
    return nextBoard;
  }

  getNeighbourPositions(nextBoard, row, col).forEach((position) => {
    nextBoard = revealCell(nextBoard, position.row, position.col);
  });

  return nextBoard;
}

export function revealAllMines(board) {
  return board.map((boardRow) =>
    boardRow.map((cell) =>
      cell.hasMine && cell.state !== CELL_STATE.FLAGGED
        ? { ...cell, state: CELL_STATE.OPEN }
        : cell,
    ),
  );
}