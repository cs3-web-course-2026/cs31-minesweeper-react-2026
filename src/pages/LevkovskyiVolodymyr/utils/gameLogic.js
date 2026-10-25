import { CELL_TYPE, CELL_STATE } from '../constants/game';

export const DIRECTIONS = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1],
];

export function createEmptyBoard(rows, cols) {
  return Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => ({
      type: CELL_TYPE.EMPTY,
      neighborMines: 0,
      state: CELL_STATE.CLOSED,
    })),
  );
}

export function generateField(rows, cols, minesCount, safeRow = -1, safeCol = -1) {
  const newBoard = createEmptyBoard(rows, cols);

  let minesPlaced = 0;
  const maxPossibleMines = rows * cols - (safeRow !== -1 ? 1 : 0);
  const targetMines = Math.min(minesCount, Math.max(0, maxPossibleMines));

  while (minesPlaced < targetMines) {
    const randomRow = Math.floor(Math.random() * rows);
    const randomCol = Math.floor(Math.random() * cols);

    if (
      safeRow !== -1 &&
      Math.abs(randomRow - safeRow) <= 1 &&
      Math.abs(randomCol - safeCol) <= 1
    ) {
      continue;
    }

    if (newBoard[randomRow][randomCol].type === CELL_TYPE.MINE) {
      continue;
    }

    newBoard[randomRow][randomCol].type = CELL_TYPE.MINE;
    minesPlaced++;
  }

  countNeighbourMines(newBoard, rows, cols);

  return newBoard;
}

export function countNeighbourMines(board, rows, cols) {
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (board[row][col].type === CELL_TYPE.MINE) {
        continue;
      }

      let count = 0;

      for (const [directionalRow, directionalCol] of DIRECTIONS) {
        const neighbourRow = row + directionalRow;
        const neighbourCol = col + directionalCol;

        if (
          neighbourRow >= 0 &&
          neighbourRow < rows &&
          neighbourCol >= 0 &&
          neighbourCol < cols &&
          board[neighbourRow][neighbourCol].type === CELL_TYPE.MINE
        ) {
          count++;
        }
      }

      board[row][col].neighborMines = count;
    }
  }
}

export function revealCellRecursively(board, startRow, startCol, rows, cols) {
  const updatedBoard = board.map((rowCells) =>
    rowCells.map((cell) => ({ ...cell })),
  );

  function reveal(row, col) {
    if (row < 0 || row >= rows || col < 0 || col >= cols) {
      return;
    }

    const cell = updatedBoard[row][col];

    if (
      cell.state === CELL_STATE.OPENED ||
      cell.state === CELL_STATE.FLAGGED ||
      cell.type === CELL_TYPE.MINE
    ) {
      return;
    }

    cell.state = CELL_STATE.OPENED;

    if (cell.neighborMines === 0) {
      for (const [directionalRow, directionalCol] of DIRECTIONS) {
        reveal(row + directionalRow, col + directionalCol);
      }
    }
  }

  reveal(startRow, startCol);

  return updatedBoard;
}

export function checkWinCondition(board, rows, cols) {
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const cell = board[row][col];

      if (cell.type !== CELL_TYPE.MINE && cell.state !== CELL_STATE.OPENED) {
        return false;
      }
    }
  }

  return true;
}
