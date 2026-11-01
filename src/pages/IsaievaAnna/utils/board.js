import { CELL_STATE, CELL_TYPE } from '../constants/game';

export function createBoard(rows, cols) {
  return Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => ({
      type: CELL_TYPE.EMPTY,
      neighborMines: 0,
      state: CELL_STATE.CLOSED,
    })),
  );
}

export function placeMines(board, mineCount, safeRow, safeCol) {
  const newBoard = board.map((boardRow) =>
    boardRow.map((cell) => ({ ...cell })),
  );

  const rows = newBoard.length;
  const cols = newBoard[0].length;
  let placedMines = 0;

  while (placedMines < mineCount) {
    const row = Math.floor(Math.random() * rows);
    const col = Math.floor(Math.random() * cols);

    if (
      (row === safeRow && col === safeCol) ||
      newBoard[row][col].type === CELL_TYPE.MINE
    ) {
      continue;
    }

    newBoard[row][col].type = CELL_TYPE.MINE;
    placedMines++;
  }

  return newBoard;
}

export function calculateAdjacency(board) {
  const newBoard = board.map((boardRow) =>
    boardRow.map((cell) => ({ ...cell })),
  );

  for (let row = 0; row < newBoard.length; row++) {
    for (let col = 0; col < newBoard[row].length; col++) {
      if (newBoard[row][col].type === CELL_TYPE.MINE) {
        continue;
      }

      let adjacentMines = 0;

      for (let directionalRow = -1; directionalRow <= 1; directionalRow++) {
        for (let directionalCol = -1; directionalCol <= 1; directionalCol++) {
          if (directionalRow === 0 && directionalCol === 0) {
            continue;
          }

          const neighbourRow = row + directionalRow;
          const neighbourCol = col + directionalCol;

          const isInsideBoard =
            neighbourRow >= 0 &&
            neighbourRow < newBoard.length &&
            neighbourCol >= 0 &&
            neighbourCol < newBoard[neighbourRow].length;

          if (
            isInsideBoard &&
            newBoard[neighbourRow][neighbourCol].type === CELL_TYPE.MINE
          ) {
            adjacentMines++;
          }
        }
      }

      newBoard[row][col].neighborMines = adjacentMines;
    }
  }

  return newBoard;
}
