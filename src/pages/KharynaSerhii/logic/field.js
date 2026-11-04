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

function validateDimensions(rows, cols) {
  if (!Number.isInteger(rows) || !Number.isInteger(cols) ||
      rows <= 0 || cols <= 0) {

    throw new RangeError('Некоректні розміри поля.');
  }
}

/**
 * Випадково обирає унікальні позиції мін для нової гри.
 * @param {number} rows Кількість рядків.
 * @param {number} cols Кількість стовпців.
 * @param {number} minesCount Кількість мін.
 * @returns {number[]} Індекси позицій мін у пласкому масиві поля.
 * @throws {RangeError} Якщо розміри або кількість мін некоректні.
 */
export function generateMinePositions(rows, cols, minesCount) {
  validateDimensions(rows, cols);
  if (!Number.isInteger(minesCount) || minesCount < 0 || minesCount >= rows * cols) {

    throw new RangeError('Некоректна кількість мін.');
  }

  const positions = Array.from({ length: rows * cols }, (_, position) => position);

  for (let mineIndex = 0; mineIndex < minesCount; mineIndex++) {
    const randomIndex = mineIndex + Math.floor(Math.random() * (positions.length - mineIndex));
    [positions[mineIndex], positions[randomIndex]] = [positions[randomIndex], positions[mineIndex]];
  }

  return positions.slice(0, minesCount);
}

/**
 * Повертає поле з кількістю мін серед сусідів кожної клітинки.
 * @param {Cell[][]} field Поле, яке потрібно обробити.
 * @returns {Cell[][]} Нове поле з підрахованими сусідніми мінами.
 */
function countNeighbourMines(field) {
  return field.map((cells, row) => cells.map((cell, col) => ({
    ...cell,
    neighborMines: getNeighbours(field, row, col).filter(
      ([neighbourRow, neighbourCol]) => field[neighbourRow][neighbourCol].type === CELL_TYPE.MINE,
    ).length,
  })));
}

/**
 * Створює детерміноване поле з переданими позиціями мін.
 * @param {number} rows Кількість рядків.
 * @param {number} cols Кількість стовпців.
 * @param {number[]} minePositions Індекси мін у пласкому масиві поля.
 * @returns {Cell[][]} Готове до гри поле.
 */
export function createBoard(rows, cols, minePositions) {
  validateDimensions(rows, cols);
  if (!Array.isArray(minePositions) || minePositions.length >= rows * cols ||
      minePositions.some(position => !Number.isInteger(position) || position < 0 || position >= rows * cols) ||
      new Set(minePositions).size !== minePositions.length) {

    throw new RangeError('Некоректні позиції мін.');
  }

  const field = Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => ({
      type: CELL_TYPE.EMPTY,
      state: CELL_STATE.CLOSED,
      neighborMines: 0,
    })),
  );
  minePositions.forEach(position => {
    field[Math.floor(position / cols)][position % cols].type = CELL_TYPE.MINE;
  });

  return countNeighbourMines(field);
}

/**
 * Відкриває порожню область і цифри на її межі, не змінюючи вхідне поле.
 * @param {Cell[][]} field Копія ігрового поля.
 * @param {number} row Рядок клітинки.
 * @param {number} col Стовпець клітинки.
 * @returns {Cell[][]} Нове поле з відкритою областю.
 */
export function revealSafeCells(field, row, col) {
  const updatedField = cloneBoard(field);
  const positionsToReveal = [[row, col]];

  while (positionsToReveal.length > 0) {
    const [targetRow, targetCol] = positionsToReveal.pop();
    const cell = updatedField[targetRow]?.[targetCol];
    if (!cell || cell.state !== CELL_STATE.CLOSED || cell.type === CELL_TYPE.MINE) {

      continue;
    }

    cell.state = CELL_STATE.OPENED;
    if (cell.neighborMines === 0) {
      positionsToReveal.push(...getNeighbours(updatedField, targetRow, targetCol));
    }
  }

  return updatedField;
}
