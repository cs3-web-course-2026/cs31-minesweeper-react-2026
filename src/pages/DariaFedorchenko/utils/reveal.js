
import { getNeighborPositions } from './board';

export function revealCells(board, row, col) {
  const cell = board[row][col];

  if (cell.state !== 'closed') {
    return board;
  }

  cell.state = 'opened';

  if (cell.isMine || cell.neighborMines !== 0) {
    return board;
  }

  const neighbors = getNeighborPositions(row, col);

  neighbors.forEach(([r, c]) => {
    if (board[r][c].state === 'closed') {
      revealCells(board, r, c);
    }
  });

  return board;
}
