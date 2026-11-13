import { MINES_COUNT } from "../constants/game";

export function checkVictory(board) {
  return board.every((row) =>
    row.every((cell) => cell.isMine || cell.state === "opened"),
  );
}

export function countFlags(board) {
  return board.flat().filter((cell) => cell.state === "flagged").length;
}

export function getRemainingMines(board) {
  return MINES_COUNT - countFlags(board);
}
