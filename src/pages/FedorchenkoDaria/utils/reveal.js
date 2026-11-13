import { getNeighborPositions } from './board';

export function revealCells(board, row, col) {
  const updatedBoard = board.map((boardRow) =>
    boardRow.map((cell) => ({ ...cell })),
  );

  function reveal(rowIndex, colIndex) {
    const cell = updatedBoard[rowIndex][colIndex];

    if (cell.state !== 'closed') {
      return;
    }

    cell.state = 'opened';

    if (cell.isMine || cell.neighborMines !== 0) {
      return;
    }

    const neighbors = getNeighborPositions(rowIndex, colIndex);

    neighbors.forEach(([neighborRow, neighborCol]) => {
      if (updatedBoard[neighborRow][neighborCol].state === 'closed') {
        reveal(neighborRow, neighborCol);
      }
    });
  }

  reveal(row, col);

  return updatedBoard;
}
