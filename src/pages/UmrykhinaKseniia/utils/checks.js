import { CELL_STATE } from '../constants/game';

export function hasRevealedMine(board) {
  return board.some((boardRow) =>
    boardRow.some((cell) => cell.hasMine && cell.state === CELL_STATE.OPEN),
  );
}

export function checkWinCondition(board) {
  return board.every((boardRow) =>
    boardRow.every((cell) => cell.hasMine || cell.state === CELL_STATE.OPEN),
  );
}

export function countFlags(board) {
  return board.reduce(
    (total, boardRow) =>
      total +
      boardRow.filter((cell) => cell.state === CELL_STATE.FLAGGED).length,
    0,
  );
}

export function hasAnyMines(board) {
  return board.some((boardRow) => boardRow.some((cell) => cell.hasMine));
}