import { CELL_STATE, CELL_TYPE } from '../constants/game';

export function isInBounds(board, row, col) {
  return (
    row >= 0 &&
    row < board.length &&
    col >= 0 &&
    col < board[row].length
  );
}

export function countFlags(board) {
  return board.reduce(
    (totalFlags, boardRow) =>
      totalFlags +
      boardRow.filter((cell) => cell.state === CELL_STATE.FLAGGED).length,
    0,
  );
}

export function checkWinCondition(board) {
  return board.every((boardRow) =>
    boardRow.every(
      (cell) =>
        cell.type === CELL_TYPE.MINE ||
        cell.state === CELL_STATE.OPEN,
    ),
  );
}
