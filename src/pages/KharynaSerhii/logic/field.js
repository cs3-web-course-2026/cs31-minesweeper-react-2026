import { CELL_STATE, CELL_TYPE } from '../constants';

/**
 * Клітинка ігрового поля.
 * @typedef {Object} Cell
 * @property {'empty'|'mine'} type Вміст клітинки.
 * @property {'closed'|'opened'|'flagged'} state Стан клітинки.
 * @property {number} neighborMines Кількість мін серед сусідів.
 */

const DIRECTIONS = [
  [-1, -1], [-1, 0], [-1, 1], [0, -1],
  [0, 1], [1, -1], [1, 0], [1, 1],
];

/**
 * Повертає координати сусідів, які не виходять за межі поля.
 * @param {Cell[][]} field Ігрове поле.
 * @param {number} row Рядок клітинки.
 * @param {number} col Стовпець клітинки.
 * @returns {number[][]} Координати сусідніх клітинок.
 */
export function getNeighbours(field, row, col) {

  return DIRECTIONS.map(([directionalRow, directionalCol]) => [
    row + directionalRow, col + directionalCol,
  ]).filter(([neighbourRow, neighbourCol]) =>
    neighbourRow >= 0 && neighbourRow < field.length &&
    neighbourCol >= 0 && neighbourCol < field[neighbourRow].length,
  );
}

/**
 * Рахує прапорці за станами клітинок.
 * @param {Cell[][]} field Ігрове поле.
 * @returns {number} Кількість установлених прапорців.
 */
export function countFlags(field) {

  return field.flat().filter(cell => cell.state === CELL_STATE.FLAGGED).length;
}

/**
 * Перевіряє, чи відкриті всі клітинки без мін.
 * @param {Cell[][]} field Ігрове поле.
 * @returns {boolean} Чи виконано умову перемоги.
 */
export function checkWinCondition(field) {

  return field.flat().every(cell =>
    cell.type === CELL_TYPE.MINE || cell.state === CELL_STATE.OPENED,
  );
}

/**
 * Створює глибоку копію поля, щоб не змінювати стан React напряму.
 * @param {Cell[][]} field Ігрове поле.
 * @returns {Cell[][]} Копія поля.
 */
export function cloneBoard(field) {

  return field.map(cells => cells.map(cell => ({ ...cell })));
}

/**
 * Створює закрите поле й випадково розставляє міни без повторів.
 * @param {number} rows Кількість рядків.
 * @param {number} cols Кількість стовпців.
 * @param {number} minesCount Кількість мін.
 * @returns {Cell[][]} Нове поле з мінами.
 * @throws {RangeError} Якщо розміри або кількість мін некоректні.
 */
function generateField(rows, cols, minesCount) {
  if (!Number.isInteger(rows) || !Number.isInteger(cols) ||
      !Number.isInteger(minesCount) || rows <= 0 || cols <= 0 ||
      minesCount < 0 || minesCount >= rows * cols) {

    throw new RangeError('Некоректні розміри поля або кількість мін.');
  }

  const field = Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => ({
      type: CELL_TYPE.EMPTY,
      state: CELL_STATE.CLOSED,
      neighborMines: 0,
    })),
  );
  const positions = Array.from({ length: rows * cols }, (_, position) => position);

  // Вибираємо позиції без повторів, навіть для щільного поля.
  for (let mineIndex = 0; mineIndex < minesCount; mineIndex++) {
    const randomIndex = mineIndex + Math.floor(Math.random() * (positions.length - mineIndex));
    [positions[mineIndex], positions[randomIndex]] = [positions[randomIndex], positions[mineIndex]];
    const position = positions[mineIndex];
    field[Math.floor(position / cols)][position % cols].type = CELL_TYPE.MINE;
  }

  return field;
}

/**
 * Записує в кожну клітинку кількість мін серед її сусідів.
 * @param {Cell[][]} field Поле, яке потрібно обробити.
 * @returns {void}
 */
function countNeighbourMines(field) {
  field.forEach((cells, row) => cells.forEach((cell, col) => {
    cell.neighborMines = getNeighbours(field, row, col).filter(
      ([neighbourRow, neighbourCol]) => field[neighbourRow][neighbourCol].type === CELL_TYPE.MINE,
    ).length;
  }));
}

/**
 * Створює нове поле з мінами та підрахованими сусідніми числами.
 * @param {number} rows Кількість рядків.
 * @param {number} cols Кількість стовпців.
 * @param {number} minesCount Кількість мін.
 * @returns {Cell[][]} Готове до гри поле.
 */
export function createBoard(rows, cols, minesCount) {
  const field = generateField(rows, cols, minesCount);
  countNeighbourMines(field);

  return field;
}

/**
 * Рекурсивно відкриває порожню область і цифри на її межі.
 * Змінює передане поле, тому викликається лише для його копії.
 * @param {Cell[][]} field Копія ігрового поля.
 * @param {number} row Рядок клітинки.
 * @param {number} col Стовпець клітинки.
 * @returns {void}
 */
export function revealSafeCells(field, row, col) {
  const cell = field[row]?.[col];
  if (!cell || cell.state !== CELL_STATE.CLOSED || cell.type === CELL_TYPE.MINE) {

    return;
  }

  cell.state = CELL_STATE.OPENED;
  if (cell.neighborMines === 0) {
    getNeighbours(field, row, col).forEach(([neighbourRow, neighbourCol]) => {
      revealSafeCells(field, neighbourRow, neighbourCol);
    });
  }
}
