import { CELL_STATE } from '../constants/game';
import { getRemainingMines } from './check';

export function revealMinesOnLoss(board) {
  return board.map((row) =>
    row.map((cell) => ({
      ...cell,
      state: cell.isMine ? CELL_STATE.OPENED : cell.state,
    })),
  );
}

export function toggleCellFlag(board, row, col) {
  const currentCell = board[row][col];

  if (currentCell.state === CELL_STATE.OPENED) {
    return board;
  }

  const flagsLeft = getRemainingMines(board);

  if (currentCell.state === CELL_STATE.CLOSED && flagsLeft <= 0) {
    return board;
  }

  return board.map((boardRow, rowIndex) =>
    boardRow.map((cell, colIndex) => {
      if (rowIndex !== row || colIndex !== col) {
        return cell;
      }

      return {
        ...cell,
        state:
          cell.state === CELL_STATE.FLAGGED
            ? CELL_STATE.CLOSED
            : CELL_STATE.FLAGGED,
      };
    }),
  );
}
