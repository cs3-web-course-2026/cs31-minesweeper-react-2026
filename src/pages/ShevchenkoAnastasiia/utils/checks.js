import { CELL_CONTENT, CELL_STATE, GAME_STATUS } from '../constants/game';

export function isInBounds(row, col, rows, cols) {
  return row >= 0 && row < rows && col >= 0 && col < cols;
}

export function isGameOver(status) {
  return status === GAME_STATUS.WON || status === GAME_STATUS.LOST;
}

export function countFlags(board) {
  return board.flat().filter((cell) => cell.state === CELL_STATE.FLAGGED)
    .length;
}

export function checkWinCondition(board) {
  return board
    .flat()
    .every(
      (cell) =>
        cell.content === CELL_CONTENT.MINE || cell.state === CELL_STATE.OPEN,
    );
}
