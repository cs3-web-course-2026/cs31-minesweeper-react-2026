import { CELL_TYPE, CELL_STATE, DIRECTIONS } from '../constants/game';

export function generateBoard(rows, cols, minesCount) {
  const board = Array.from({ length: rows }, (_row, row) =>
    Array.from({ length: cols }, (_col, col) => ({
      row,
      col,
      type: CELL_TYPE.EMPTY,
      state: CELL_STATE.CLOSED,
      neighborMines: 0,
    }))
  );

  let placedMines = 0;
  while (placedMines < minesCount) {
    const row = Math.floor(Math.random() * rows);
    const col = Math.floor(Math.random() * cols);
    if (board[row][col].type !== CELL_TYPE.MINE) {
      board[row][col].type = CELL_TYPE.MINE;
      placedMines++;
    }
  }

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (board[row][col].type === CELL_TYPE.MINE) continue;
      let minesAround = 0;
      for (const [rOffset, cOffset] of DIRECTIONS) {
        const nRow = row + rOffset;
        const nCol = col + cOffset;
        if (
          nRow >= 0 && nRow < rows &&
          nCol >= 0 && nCol < cols &&
          board[nRow][nCol].type === CELL_TYPE.MINE
        ) {
          minesAround++;
        }
      }
      board[row][col].neighborMines = minesAround;
    }
  }

  return board;
}