import { CELL_CONTENT, CELL_STATE } from '../constants/game';

import { createCellKey, getNeighbourPositions } from './board';

// Collects the clicked cell and, for empty regions, every cell reachable
// through cells without adjacent mines (iterative flood fill).
export function floodFillReveal(board, startRow, startCol) {
  const cellsToReveal = new Set();
  const pendingPositions = [{ row: startRow, col: startCol }];

  while (pendingPositions.length > 0) {
    const { row, col } = pendingPositions.pop();
    const cellKey = createCellKey(row, col);
    const cell = board[row][col];

    if (cellsToReveal.has(cellKey) || cell.state !== CELL_STATE.CLOSED) {
      continue;
    }

    cellsToReveal.add(cellKey);

    if (cell.adjacentMines === 0) {
      pendingPositions.push(...getNeighbourPositions(board, row, col));
    }
  }

  return cellsToReveal;
}

export function revealCell(board, row, col) {
  const cellsToReveal = floodFillReveal(board, row, col);

  if (cellsToReveal.size === 0) {
    return board;
  }

  return board.map((boardRow, rowIndex) =>
    boardRow.map((cell, colIndex) =>
      cellsToReveal.has(createCellKey(rowIndex, colIndex))
        ? { ...cell, state: CELL_STATE.OPEN }
        : cell,
    ),
  );
}

// Flagged mines stay flagged so wrong flags can still be told apart.
export function revealAllMines(board) {
  return board.map((boardRow) =>
    boardRow.map((cell) =>
      cell.content === CELL_CONTENT.MINE && cell.state === CELL_STATE.CLOSED
        ? { ...cell, state: CELL_STATE.OPEN }
        : cell,
    ),
  );
}
