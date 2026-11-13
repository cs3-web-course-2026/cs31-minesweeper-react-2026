import { CELL_STATE, CELL_TYPE } from '../constants/game';

export function revealCell(board, targetRow, targetCol) {
  const newBoard = board.map((boardRow) =>
    boardRow.map((cell) => ({ ...cell })),
  );

  const rows = newBoard.length;
  const cols = newBoard[0].length;

  function revealAdjacentCells(row, col) {
    if (row < 0 || row >= rows || col < 0 || col >= cols) {
      return;
    }

    const cell = newBoard[row][col];

    if (cell.state !== CELL_STATE.CLOSED) {
      return;
    }

    if (
      cell.type === CELL_TYPE.MINE &&
      (row !== targetRow || col !== targetCol)
    ) {
      return;
    }

    cell.state = CELL_STATE.OPEN;

    if (cell.type === CELL_TYPE.MINE || cell.neighborMines > 0) {
      return;
    }

    for (let directionalRow = -1; directionalRow <= 1; directionalRow++) {
      for (let directionalCol = -1; directionalCol <= 1; directionalCol++) {
        if (directionalRow === 0 && directionalCol === 0) {
          continue;
        }

        const neighbourRow = row + directionalRow;
        const neighbourCol = col + directionalCol;

        revealAdjacentCells(neighbourRow, neighbourCol);
      }
    }
  }

  revealAdjacentCells(targetRow, targetCol);

  return newBoard;
}
