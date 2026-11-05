import { CELL_STATE, CELL_TYPE } from '../constants/game';


export function isInBounds(field, row, col) {
  return (
    row >= 0 &&
    row < field.length &&
    col >= 0 &&
    col < field[0].length
  );
}


export function getFlaggedCellsCount(field) {
  let flaggedCount = 0;

  for (let row = 0; row < field.length; row++) {
    for (let col = 0; col < field[row].length; col++) {
      if (field[row][col].state === CELL_STATE.FLAGGED) {
        flaggedCount++;
      }
    }
  }

  return flaggedCount;
}


export function checkWinCondition(field) {
  for (let row = 0; row < field.length; row++) {
    for (let col = 0; col < field[row].length; col++) {
      const cell = field[row][col];

      if (
        cell.type === CELL_TYPE.EMPTY &&
        cell.state !== CELL_STATE.OPENED
      ) {
        return false;
      }
    }
  }

  return true;
}
