import {
  CELL_TYPE,
  CELL_STATE,
  ROWS,
  COLS,
  MINES_COUNT,
  DIRECTIONS,
} from '../constants/game';

export function initEmptyBoard() {
  const newBoard = [];
  for (let r = 0; r < ROWS; r++) {
    const row = [];
    for (let c = 0; c < COLS; c++) {
      row.push({
        type: CELL_TYPE.EMPTY,
        state: CELL_STATE.CLOSED,
        neighborMines: 0,
        exploded: false,
      });
    }
    newBoard.push(row);
  }
  return newBoard;
}

export function generateMines(currentBoard, firstRow, firstCol) {
  let minesPlaced = 0;
  const newBoard = currentBoard.map((row) => row.map((cell) => ({ ...cell })));

  while (minesPlaced < MINES_COUNT) {
    const r = Math.floor(Math.random() * ROWS);
    const c = Math.floor(Math.random() * COLS);
    const isSafeZone =
      Math.abs(r - firstRow) <= 1 && Math.abs(c - firstCol) <= 1;

    if (newBoard[r][c].type !== CELL_TYPE.MINE && !isSafeZone) {
      newBoard[r][c].type = CELL_TYPE.MINE;
      minesPlaced++;
    }
  }

  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      if (newBoard[r][c].type === CELL_TYPE.MINE) continue;
      let count = 0;
      for (const [dr, dc] of DIRECTIONS) {
        const nr = r + dr;
        const nc = c + dc;
        if (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS) {
          if (newBoard[nr][nc].type === CELL_TYPE.MINE) count++;
        }
      }
      newBoard[r][c].neighborMines = count;
    }
  }
  return newBoard;
}
