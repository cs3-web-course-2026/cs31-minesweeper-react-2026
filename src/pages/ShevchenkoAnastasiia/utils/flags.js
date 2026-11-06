import { CELL_STATE } from '../constants/game';
import { countFlags } from './checks';

function replaceCellState(board, targetRow, targetCol, state) {
  return board.map((boardRow, row) =>
    boardRow.map((cell, col) =>
      row === targetRow && col === targetCol ? { ...cell, state } : cell,
    ),
  );
}

export function toggleFlag(board, row, col, minesCount) {
  const cell = board[row][col];

  if (cell.state === CELL_STATE.OPEN) {
    return board;
  }

  if (cell.state === CELL_STATE.FLAGGED) {
    return replaceCellState(board, row, col, CELL_STATE.CLOSED);
  }

  if (countFlags(board) >= minesCount) {
    return board;
  }

  return replaceCellState(board, row, col, CELL_STATE.FLAGGED);
}
