import { CELL_STATE, NEIGHBOUR_OFFSETS } from '../constants/game';

export function isInBounds(board, row, col) {
  return row >= 0 && row < board.length && col >= 0 && col < board[0].length;
}

export function getNeighbourPositions(board, row, col) {
  return NEIGHBOUR_OFFSETS.map(([directionalRow, directionalCol]) => ({
    row: row + directionalRow,
    col: col + directionalCol,
  })).filter((position) => isInBounds(board, position.row, position.col));
}

export function createBoard(rows, cols) {
  return Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => ({
      state: CELL_STATE.CLOSED,
      hasMine: false,
      adjacentMines: 0,
    })),
  );
}

function pickRandomMinePositions(rows, cols, mineCount, safeRow, safeCol) {
  const candidates = [];

  for (let row = 0; row < rows; row += 1) {
    for (let col = 0; col < cols; col += 1) {
      if (row !== safeRow || col !== safeCol) {
        candidates.push({ row, col });
      }
    }
  }

  for (let index = candidates.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [candidates[index], candidates[swapIndex]] = [
      candidates[swapIndex],
      candidates[index],
    ];
  }

  return candidates.slice(0, mineCount);
}

export function countAdjacentMines(board, row, col) {
  return getNeighbourPositions(board, row, col).filter(
    (position) => board[position.row][position.col].hasMine,
  ).length;
}

export function calculateAdjacency(board) {
  return board.map((boardRow, row) =>
    boardRow.map((cell, col) => ({
      ...cell,
      adjacentMines: countAdjacentMines(board, row, col),
    })),
  );
}

// The first click is always safe: mines are placed after it, away from it.
export function placeMines(board, mineCount, safeRow, safeCol) {
  const minePositions = pickRandomMinePositions(
    board.length,
    board[0].length,
    mineCount,
    safeRow,
    safeCol,
  );
  const minedBoard = board.map((boardRow, row) =>
    boardRow.map((cell, col) => ({
      ...cell,
      hasMine: minePositions.some(
        (position) => position.row === row && position.col === col,
      ),
    })),
  );

  return calculateAdjacency(minedBoard);
}