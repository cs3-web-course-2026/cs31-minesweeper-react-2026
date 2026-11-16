export const DEFAULT_ROWS = 10;
export const DEFAULT_COLS = 10;
export const DEFAULT_MINES = 15;

export const GAME_STATUS = Object.freeze({
  PROCESS: 'process',
  WIN: 'win',
  LOSE: 'lose',
});

export const CELL_STATE = Object.freeze({
  CLOSED: 'closed',
  OPENED: 'opened',
  FLAGGED: 'flagged',
});

export const CELL_TYPE = Object.freeze({
  EMPTY: 'empty',
  MINE: 'mine',
});

const NEIGHBOR_OFFSETS = [
  [-1, -1], [-1, 0], [-1, 1],
  [0, -1],           [0, 1],
  [1, -1],  [1, 0],  [1, 1],
];

export function isWithinBounds(row, col, rows, cols) {
  return row >= 0 && row < rows && col >= 0 && col < cols;
}

export function cloneField(field) {
  return field.map((row) => row.map((cell) => ({ ...cell })));
}

export function countNeighbourMines(field) {
  const rows = field.length;
  const cols = field[0]?.length ?? 0;
  const nextField = cloneField(field);

  for (let row = 0; row < rows; row += 1) {
    for (let col = 0; col < cols; col += 1) {
      if (nextField[row][col].type === CELL_TYPE.MINE) {
        continue;
      }

      let count = 0;
      for (const [dRow, dCol] of NEIGHBOR_OFFSETS) {
        const nextRow = row + dRow;
        const nextCol = col + dCol;
        if (
          isWithinBounds(nextRow, nextCol, rows, cols) &&
          nextField[nextRow][nextCol].type === CELL_TYPE.MINE
        ) {
          count += 1;
        }
      }

      nextField[row][col].neighborMines = count;
    }
  }

  return nextField;
}

export function generateField(
  rows = DEFAULT_ROWS,
  cols = DEFAULT_COLS,
  minesCount = DEFAULT_MINES,
) {
  const field = Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => ({
      type: CELL_TYPE.EMPTY,
      neighborMines: 0,
      state: CELL_STATE.CLOSED,
    })),
  );

  let placedMines = 0;
  const maxMines = Math.min(minesCount, rows * cols - 1);

  while (placedMines < maxMines) {
    const randomRow = Math.floor(Math.random() * rows);
    const randomCol = Math.floor(Math.random() * cols);

    if (field[randomRow][randomCol].type !== CELL_TYPE.MINE) {
      field[randomRow][randomCol].type = CELL_TYPE.MINE;
      placedMines += 1;
    }
  }

  return countNeighbourMines(field);
}

export function toggleFlag(field, row, col) {
  const targetCell = field[row]?.[col];
  if (!targetCell || targetCell.state === CELL_STATE.OPENED) {
    return field;
  }

  const nextField = cloneField(field);
  nextField[row][col].state =
    nextField[row][col].state === CELL_STATE.FLAGGED
      ? CELL_STATE.CLOSED
      : CELL_STATE.FLAGGED;

  return nextField;
}

export function revealCells(field, startRow, startCol) {
  const rows = field.length;
  const cols = field[0]?.length ?? 0;
  const startCell = field[startRow]?.[startCol];

  if (
    !startCell ||
    startCell.state === CELL_STATE.OPENED ||
    startCell.state === CELL_STATE.FLAGGED
  ) {
    return { nextField: field, hitMine: false };
  }

  const nextField = cloneField(field);
  nextField[startRow][startCol].state = CELL_STATE.OPENED;

  if (nextField[startRow][startCol].type === CELL_TYPE.MINE) {
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
      if (
        neighbor.state === CELL_STATE.CLOSED &&
        neighbor.type === CELL_TYPE.EMPTY
      ) {
        neighbor.state = CELL_STATE.OPENED;
        openEmptyNeighbors(nextRow, nextCol);
      }
    }
  };

  openEmptyNeighbors(startRow, startCol);
  return { nextField, hitMine: false };
}

export function checkWinCondition(field) {
  return !field.some((row) =>
    row.some(
      (cell) =>
        cell.type === CELL_TYPE.EMPTY && cell.state !== CELL_STATE.OPENED,
    ),
  );
}

export function countFlags(field) {
  return field.reduce(
    (total, row) =>
      total + row.filter((cell) => cell.state === CELL_STATE.FLAGGED).length,
    0,
  );
}