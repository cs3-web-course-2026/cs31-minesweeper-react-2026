import { CELL_STATE, CELL_TYPE, DIRECTIONS } from '../constants/game';
import { isInBounds } from './checks';


export function createEmptyCell() {
  return {
    type: CELL_TYPE.EMPTY,
    neighborMines: 0,
    state: CELL_STATE.CLOSED,
    isExploded: false,
  };
}


export function cloneBoard(field) {
  return field.map((rowCells) => rowCells.map((cell) => ({ ...cell })));
}


// Підрахунок кількості сусідніх мін для кожної безпечної клітинки
export function countNeighbourMines(field) {
  const updatedField = cloneBoard(field);

  for (let row = 0; row < updatedField.length; row++) {
    for (let col = 0; col < updatedField[row].length; col++) {
      if (updatedField[row][col].type === CELL_TYPE.MINE) {
        continue;
      }

      let minesCount = 0;

      for (const [directionalRow, directionalCol] of DIRECTIONS) {
        const neighbourRow = row + directionalRow;
        const neighbourCol = col + directionalCol;

        if (
          isInBounds(updatedField, neighbourRow, neighbourCol) &&
          updatedField[neighbourRow][neighbourCol].type === CELL_TYPE.MINE
        ) {
          minesCount++;
        }
      }

      updatedField[row][col].neighborMines = minesCount;
    }
  }

  return updatedField;
}


// Генерація ігрового поля та випадкове розміщення мін
export function generateField(rows, cols, minesCount) {
  const field = Array.from({ length: rows }, () =>
    Array.from({ length: cols }, createEmptyCell),
  );

  let placedMines = 0;

  while (placedMines < minesCount) {
    const randomRow = Math.floor(Math.random() * rows);
    const randomCol = Math.floor(Math.random() * cols);

    if (field[randomRow][randomCol].type !== CELL_TYPE.MINE) {
      field[randomRow][randomCol].type = CELL_TYPE.MINE;
      placedMines++;
    }
  }

  return countNeighbourMines(field);
}
