import { CELL_STATE } from '../constants/game';
import { getNeighborPositions } from './board';

export function revealCells(board, row, col) {
  const updatedBoard = board.map((boardRow) =>
    boardRow.map((cell) => ({ ...cell })),
  );

  function reveal(rowIndex, colIndex) {
    const cell = updatedBoard[rowIndex][colIndex];

    if (cell.state !== CELL_STATE.CLOSED) {
      return;
    }

    cell.state = CELL_STATE.OPENED;

    if (cell.isMine || cell.neighborMines !== 0) {
      return;
    }

    const neighbors = getNeighborPositions(rowIndex, colIndex);

    neighbors.forEach(([neighborRow, neighborCol]) => {
      if (updatedBoard[neighborRow][neighborCol].state === CELL_STATE.CLOSED) {
        reveal(neighborRow, neighborCol);
      }
    });
  }

  reveal(row, col);

  return updatedBoard;
}
