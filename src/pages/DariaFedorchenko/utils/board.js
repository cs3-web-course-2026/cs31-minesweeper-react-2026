import { ROWS, COLS, MINES_COUNT } from "../constants/game";

export function createBoard() {
  const board = Array.from({ length: ROWS }, () =>
    Array.from({ length: COLS }, () => ({
      isMine: false,
      neighborMines: 0,
      state: "closed",
    })),
  );

  let minesPlaced = 0;

  while (minesPlaced < MINES_COUNT) {
    const row = Math.floor(Math.random() * ROWS);
    const col = Math.floor(Math.random() * COLS);

    if (!board[row][col].isMine) {
      board[row][col].isMine = true;
      minesPlaced++;
    }
  }

  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      if (!board[row][col].isMine) {
        board[row][col].neighborMines = getNeighborPositions(row, col).filter(
          ([r, c]) => board[r][c].isMine,
        ).length;
      }
    }
  }

  return board;
}

export function getNeighborPositions(row, col) {
  const positions = [];

  for (let r = row - 1; r <= row + 1; r++) {
    for (let c = col - 1; c <= col + 1; c++) {
      if (
        r >= 0 &&
        r < ROWS &&
        c >= 0 &&
        c < COLS &&
        (r !== row || c !== col)
      ) {
        positions.push([r, c]);
      }
    }
  }

  return positions;
}
