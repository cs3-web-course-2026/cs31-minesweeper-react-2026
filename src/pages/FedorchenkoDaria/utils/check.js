import { MINES_COUNT, CELL_STATE } from '../constants/game';

export function checkVictory(board) {
  return board.every((row) =>
    row.every((cell) => cell.isMine || cell.state === CELL_STATE.OPENED),
  );
}

export function countFlags(board) {
  return board.flat().filter((cell) => cell.state === CELL_STATE.FLAGGED)
    .length;
}

export function getRemainingMines(board) {
  return MINES_COUNT - countFlags(board);
}
