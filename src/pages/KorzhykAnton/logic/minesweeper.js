import { CELL_STATE, CELL_TYPE } from '../constants';

/*
 * Чиста логіка гри: функції не мутують вхідне поле,
 * а повертають нове — це потрібно для коректної роботи стану React.
 */

const NEIGHBOUR_OFFSETS = [
  [-1, -1], [-1, 0], [-1, 1],
  [0, -1],           [0, 1],
  [1, -1],  [1, 0],  [1, 1],
];

const createCell = () => ({
  type: CELL_TYPE.EMPTY,
  neighborMines: 0,
  state: CELL_STATE.CLOSED,
});

const cloneField = (field) => field.map((row) => row.map((cell) => ({ ...cell })));

function getNeighbours(field, row, col) {
  return NEIGHBOUR_OFFSETS
    .map(([rowOffset, colOffset]) => [row + rowOffset, col + colOffset])
    .filter(([neighbourRow, neighbourCol]) => field[neighbourRow]?.[neighbourCol] !== undefined);
}

function placeMines(field, minesCount) {
  const rows = field.length;
  const cols = field[0].length;
  let placedMines = 0;

  while (placedMines < minesCount) {
    const row = Math.floor(Math.random() * rows);
    const col = Math.floor(Math.random() * cols);

    if (field[row][col].type !== CELL_TYPE.MINE) {
      field[row][col].type = CELL_TYPE.MINE;
      placedMines++;
    }
  }
}

function countNeighbourMines(field) {
  field.forEach((rowCells, row) => {
    rowCells.forEach((cell, col) => {
      if (cell.type === CELL_TYPE.MINE) return;

      cell.neighborMines = getNeighbours(field, row, col)
        .filter(([neighbourRow, neighbourCol]) => field[neighbourRow][neighbourCol].type === CELL_TYPE.MINE)
        .length;
    });
  });
}

export function generateField(rows, cols, minesCount) {
  const field = Array.from({ length: rows }, () => Array.from({ length: cols }, createCell));

  placeMines(field, minesCount);
  countNeighbourMines(field);

  return field;
}

/** Відкриває клітинку (рекурсивно для порожніх). Повертає { field, isMine }. */
export function openCell(field, row, col) {
  if (field[row][col].state !== CELL_STATE.CLOSED) {
    return { field, isMine: false };
  }

  const nextField = cloneField(field);

  const openRecursively = (currentRow, currentCol) => {
    const cell = nextField[currentRow][currentCol];
    if (cell.state !== CELL_STATE.CLOSED) return;

    cell.state = CELL_STATE.OPENED;

    if (cell.type === CELL_TYPE.EMPTY && cell.neighborMines === 0) {
      getNeighbours(nextField, currentRow, currentCol).forEach(([neighbourRow, neighbourCol]) =>
        openRecursively(neighbourRow, neighbourCol),
      );
    }
  };

  openRecursively(row, col);

  return {
    field: nextField,
    isMine: nextField[row][col].type === CELL_TYPE.MINE,
  };
}

export function toggleFlag(field, row, col) {
  const { state } = field[row][col];
  if (state === CELL_STATE.OPENED) return field;

  const nextField = cloneField(field);
  nextField[row][col].state = state === CELL_STATE.FLAGGED ? CELL_STATE.CLOSED : CELL_STATE.FLAGGED;

  return nextField;
}

export const countFlags = (field) =>
  field.flat().filter((cell) => cell.state === CELL_STATE.FLAGGED).length;

export const isWin = (field) =>
  field.flat().every((cell) => cell.type === CELL_TYPE.MINE || cell.state === CELL_STATE.OPENED);
