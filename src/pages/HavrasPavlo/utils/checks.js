import { CELL_STATE, CELL_CONTENT } from '../constants/game.js';


export function isInBounds(row, col, rows, cols) {
  return row >= 0 && row < rows && col >= 0 && col < cols;
}


export function checkWinCondition(board, rows, cols, mineCount) {
  const totalSafeCells = rows * cols - mineCount;
  let openedSafeCells = 0;

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const cell = board[row][col];

      if (cell.content === CELL_CONTENT.MINE && cell.state === CELL_STATE.OPEN) {
        return false;
      }

      if (cell.content === CELL_CONTENT.EMPTY && cell.state === CELL_STATE.OPEN) {
        openedSafeCells++;
      }
    }
  }

  return openedSafeCells === totalSafeCells;
}


export function countFlags(board) {
  let flaggedCount = 0;

  for (const rowCells of board) {
    for (const cell of rowCells) {
      if (cell.state === CELL_STATE.FLAGGED) {
        flaggedCount++;
      }
    }
  }

  return flaggedCount;
}
