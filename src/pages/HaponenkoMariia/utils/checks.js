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
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      if (
        currentBoard[r][c].type === CELL_TYPE.EMPTY &&
        currentBoard[r][c].state === CELL_STATE.OPENED
      ) {
        safeOpened++;
      }
    }
  }
  return safeOpened === targetSafe;
}
