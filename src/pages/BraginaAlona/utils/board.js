import { CELL_CONTENT, CELL_STATE } from '../constants/game';

const DIRECTIONS = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1],
];

export function isInBounds(row, col, rows, cols) {
  return row >= 0 && row < rows && col >= 0 && col < cols;
}

export function getNeighbourPositions(row, col, rows, cols) {
  return DIRECTIONS
    .map(([rowOffset, colOffset]) => [
      row + rowOffset,
      col + colOffset,
    ])
    .filter(([neighbourRow, neighbourCol]) =>
      isInBounds(neighbourRow, neighbourCol, rows, cols),
    );
}

export function countAdjacentMines(minePositions, row, col, rows, cols) {
  return getNeighbourPositions(row, col, rows, cols).filter(
    ([neighbourRow, neighbourCol]) =>
      minePositions.some(
        (mine) => mine.row === neighbourRow && mine.col === neighbourCol,
      ),
  ).length;
}

export function createBoard(rows, cols, minePositions) {
  return Array.from({ length: rows }, (_row, row) =>
    Array.from({ length: cols }, (_col, col) => {
      const hasMine = minePositions.some(
        (mine) => mine.row === row && mine.col === col,
      );

      return {
        content: hasMine ? CELL_CONTENT.MINE : CELL_CONTENT.EMPTY,
        state: CELL_STATE.CLOSED,
        adjacentMines: hasMine
          ? 0
          : countAdjacentMines(minePositions, row, col, rows, cols),
      };
    }),
  );
}

export function generateMinePositions(rows, cols, mineCount) {
  const positions = [];
  const usedPositions = new Set();

  while (positions.length < mineCount) {
    const row = Math.floor(Math.random() * rows);
    const col = Math.floor(Math.random() * cols);

    const positionKey = `${row}-${col}`;

    if (!usedPositions.has(positionKey)) {
      usedPositions.add(positionKey);
      positions.push({ row, col });
    }
  }

  return positions;
}