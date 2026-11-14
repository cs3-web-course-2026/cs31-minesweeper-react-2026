import { CELL_CONTENT, CELL_STATE } from '../constants/game';
import { getNeighbourPositions } from './board';

export function revealCell(board, startRow, startCol) {
  const rows = board.length;
  const cols = board[0].length;
  const nextBoard = board.map((boardRow) => [...boardRow]);
  const pendingPositions = [{ row: startRow, col: startCol }];

  while (pendingPositions.length > 0) {
    const { row, col } = pendingPositions.pop();
    const cell = nextBoard[row][col];

    if (cell.state === CELL_STATE.CLOSED) {
      nextBoard[row][col] = { ...cell, state: CELL_STATE.OPEN };

      if (cell.content === CELL_CONTENT.EMPTY && cell.adjacentMines === 0) {
        pendingPositions.push(...getNeighbourPositions(row, col, rows, cols));
      }
    }
  }

  return nextBoard;
}
