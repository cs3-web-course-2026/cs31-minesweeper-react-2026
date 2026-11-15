import {
  CELL_STATE,
  CELL_TYPE,
  ROWS,
  COLS,
  DIRECTIONS,
} from '../constants/game';

export function revealCell(currentBoard, row, col) {
  const cell = currentBoard[row][col];
  if (cell.state === CELL_STATE.OPENED || cell.state === CELL_STATE.FLAGGED)
    return;

  cell.state = CELL_STATE.OPENED;

  if (cell.type === CELL_TYPE.MINE) {
    cell.exploded = true;
    return;
  }

  if (cell.neighborMines === 0) {
    for (const [dr, dc] of DIRECTIONS) {
      const nr = row + dr;
      const nc = col + dc;
      if (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS) {
        revealCell(currentBoard, nr, nc);
      }
    }
  }
}
