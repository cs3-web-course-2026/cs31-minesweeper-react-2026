import { CELL_CONTENT, CELL_STATE } from '../constants/game';

export function toggleFlag(board, row, col) {
  const targetCell = board[row][col];

  if (targetCell.state === CELL_STATE.OPEN) {
    return board;
  }

  const nextState =
    targetCell.state === CELL_STATE.FLAGGED
      ? CELL_STATE.CLOSED
      : CELL_STATE.FLAGGED;

  return board.map((boardRow, rowIndex) =>
    boardRow.map((cell, colIndex) =>
      rowIndex === row && colIndex === col
        ? { ...cell, state: nextState }
        : cell,
    ),
  );
}

export function flagAllMines(board) {
  return board.map((boardRow) =>
    boardRow.map((cell) =>
      cell.content === CELL_CONTENT.MINE
        ? { ...cell, state: CELL_STATE.FLAGGED }
        : cell,
    ),
  );
}
