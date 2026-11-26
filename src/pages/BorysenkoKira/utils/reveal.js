import { CELL_TYPE, CELL_STATE, DIRECTIONS } from '../constants/game';

export function revealCells(currentBoard, startRow, startCol) {
  const rows = currentBoard.length;
  const cols = currentBoard[0].length;
  const nextBoard = currentBoard.map((r) => r.map((c) => ({ ...c })));

  const openRecursive = (row, col) => {
    if (row < 0 || row >= rows || col < 0 || col >= cols) return;
    const cell = nextBoard[row][col];
    if (cell.state === CELL_STATE.OPENED || cell.state === CELL_STATE.FLAGGED) {
      return;
    }

    cell.state = CELL_STATE.OPENED;

    if (cell.neighborMines === 0 && cell.type === CELL_TYPE.EMPTY) {
      for (const [rOffset, cOffset] of DIRECTIONS) {
        openRecursive(row + rOffset, col + cOffset);
      }
    }
  };

  openRecursive(startRow, startCol);
  return nextBoard;
}

export function revealAllMines(currentBoard) {
  return currentBoard.map((row) =>
    row.map((cell) =>
      cell.type === CELL_TYPE.MINE
        ? { ...cell, state: CELL_STATE.OPENED }
        : { ...cell }
    )
  );
}