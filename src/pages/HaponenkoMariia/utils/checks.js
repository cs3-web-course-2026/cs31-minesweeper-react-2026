import {
  ROWS,
  COLS,
  MINES_COUNT,
  CELL_TYPE,
  CELL_STATE,
} from '../constants/game';

export function checkWinCondition(currentBoard) {
  let safeOpened = 0;
  const targetSafe = ROWS * COLS - MINES_COUNT;

  for (let rowIndex = 0; rowIndex < ROWS; rowIndex++) {
    for (let colIndex = 0; colIndex < COLS; colIndex++) {
      if (
        currentBoard[rowIndex][colIndex].type === CELL_TYPE.EMPTY &&
        currentBoard[rowIndex][colIndex].state === CELL_STATE.OPENED
      ) {
        safeOpened++;
      }
    }
  }
  return safeOpened === targetSafe;
}
