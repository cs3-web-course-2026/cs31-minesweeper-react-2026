import { ROWS, COLS, MINES_COUNT } from '../constants/game';

export function createBoard() {
  const board = Array.from({ length: ROWS }, () =>
    Array.from({ length: COLS }, () => ({
      isMine: false,
      neighborMines: 0,
      state: 'closed',
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
          ([neighborRow, neighborCol]) =>
            board[neighborRow][neighborCol].isMine,
        ).length;
      }
    }
  }

  return board;
}

export function getNeighborPositions(row, col) {
  const positions = [];

  for (let neighborRow = row - 1; neighborRow <= row + 1; neighborRow++) {
    for (let neighborCol = col - 1; neighborCol <= col + 1; neighborCol++) {
      const isInsideBoard =
        neighborRow >= 0 &&
        neighborRow < ROWS &&
        neighborCol >= 0 &&
        neighborCol < COLS;

      const isNotCurrentCell = neighborRow !== row || neighborCol !== col;

      if (isInsideBoard && isNotCurrentCell) {
        positions.push([neighborRow, neighborCol]);
      }
    }
  }

  return positions;
}
