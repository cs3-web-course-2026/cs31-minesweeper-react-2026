export const DEFAULT_ROWS = 10;
export const DEFAULT_COLS = 10;
export const DEFAULT_MINES = 15;

const NEIGHBOR_OFFSETS = [
  [-1, -1], [-1, 0], [-1, 1],
  [0, -1],           [0, 1],
  [1, -1],  [1, 0],  [1, 1],
];

export function isWithinBounds(row, col, rows, cols) {
  return row >= 0 && row < rows && col >= 0 && col < cols;
}

export function countNeighbourMines(field) {
  const rows = field.length;
  const cols = field[0].length;

  for (let row = 0; row < rows; row += 1) {
    for (let col = 0; col < cols; col += 1) {
      if (field[row][col].type === 'mine') {
        continue;
      }

      let count = 0;
      for (const [dRow, dCol] of NEIGHBOR_OFFSETS) {
        const nextRow = row + dRow;
        const nextCol = col + dCol;
        if (
          isWithinBounds(nextRow, nextCol, rows, cols) &&
          field[nextRow][nextCol].type === 'mine'
        ) {
          count += 1;
        }
      }

      field[row][col].neighborMines = count;
    }
  }
}

export function generateField(rows = DEFAULT_ROWS, cols = DEFAULT_COLS, minesCount = DEFAULT_MINES) {
  const field = Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => ({
      type: 'empty',
      neighborMines: 0,
      state: 'closed',
    })),
  );

  let placedMines = 0;
  const maxMines = Math.min(minesCount, rows * cols - 1);

  while (placedMines < maxMines) {
    const randomRow = Math.floor(Math.random() * rows);
    const randomCol = Math.floor(Math.random() * cols);

    if (field[randomRow][randomCol].type !== 'mine') {
      field[randomRow][randomCol].type = 'mine';
      placedMines += 1;
    }
  }

  countNeighbourMines(field);
  return field;
}

export function cloneField(field) {
  return field.map((row) => row.map((cell) => ({ ...cell })));
}

export function revealCells(field, startRow, startCol) {
  const rows = field.length;
  const cols = field[0].length;
  const nextField = cloneField(field);
  const startCell = nextField[startRow]?.[startCol];

  if (!startCell || startCell.state === 'opened' || startCell.state === 'flagged') {
    return { nextField: field, hitMine: false };
  }

  startCell.state = 'opened';

  if (startCell.type === 'mine') {
    return { nextField, hitMine: true };
  }

  const openEmptyNeighbors = (row, col) => {
    if (nextField[row][col].neighborMines !== 0) {
      return;
    }

    for (const [dRow, dCol] of NEIGHBOR_OFFSETS) {
      const nextRow = row + dRow;
      const nextCol = col + dCol;

      if (!isWithinBounds(nextRow, nextCol, rows, cols)) {
        continue;
      }

      const neighbor = nextField[nextRow][nextCol];
      if (neighbor.state === 'closed' && neighbor.type === 'empty') {
        neighbor.state = 'opened';
        openEmptyNeighbors(nextRow, nextCol);
      }
    }
  };

  openEmptyNeighbors(startRow, startCol);
  return { nextField, hitMine: false };
}

export function checkWinCondition(field) {
  return !field.some((row) =>
    row.some((cell) => cell.type === 'empty' && cell.state !== 'opened'),
  );
}

export function countFlags(field) {
  return field.reduce(
    (total, row) => total + row.filter((cell) => cell.state === 'flagged').length,
    0,
  );
}