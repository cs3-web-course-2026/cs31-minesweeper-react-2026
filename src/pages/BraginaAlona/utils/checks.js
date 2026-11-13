import { CELL_CONTENT, CELL_STATE } from '../constants/game';

// Перевіряє, чи гравець відкрив міну
export function isMine(cell) {
  return cell.content === CELL_CONTENT.MINE;
}

// Перевіряє, чи гравець переміг
export function checkWin(board) {
  return board.every((row) =>
    row.every(
      (cell) =>
        cell.content === CELL_CONTENT.MINE ||
        cell.state === CELL_STATE.OPEN,
    ),
  );
}

// Підраховує встановлені прапорці
export function countFlags(board) {
  return board.reduce(
    (total, row) =>
      total +
      row.filter((cell) => cell.state === CELL_STATE.FLAGGED).length,
    0,
  );
}

// Підраховує кількість відкритих клітинок
export function countOpenedCells(board) {
  return board.reduce(
    (total, row) =>
      total +
      row.filter((cell) => cell.state === CELL_STATE.OPEN).length,
    0,
  );
}