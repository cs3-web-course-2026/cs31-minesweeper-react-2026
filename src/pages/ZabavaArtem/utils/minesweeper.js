export const ROWS = 10;
export const COLS = 10;
export const MINES_COUNT = 15;

const DIRECTIONS = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1],
];

export const CELL_TYPE = { EMPTY: 'empty', MINE: 'mine' };
export const CELL_STATE = { CLOSED: 'closed', OPENED: 'opened', FLAGGED: 'flagged' };

export function createBoard() {
  const board = Array.from({ length: ROWS }, () =>
    Array.from({ length: COLS }, () => ({
      type: CELL_TYPE.EMPTY,
      state: CELL_STATE.CLOSED,
      neighborMines: 0,
      isExploded: false,
    })),
  );

  let placedMines = 0;
  while (placedMines < MINES_COUNT) {
    const row = Math.floor(Math.random() * ROWS);
    const col = Math.floor(Math.random() * COLS);

    if (board[row][col].type === CELL_TYPE.MINE) continue;
    board[row][col].type = CELL_TYPE.MINE;
    placedMines += 1;
  }

  board.forEach((rowCells, row) => {
    rowCells.forEach((cell, col) => {
      if (cell.type === CELL_TYPE.MINE) return;
      cell.neighborMines = getNeighbors(row, col).filter(
        ([neighborRow, neighborCol]) =>
          board[neighborRow][neighborCol].type === CELL_TYPE.MINE,
      ).length;
    });
  });

  return board;
}

export function getNeighbors(row, col) {
  return DIRECTIONS.map(([rowOffset, colOffset]) => [
    row + rowOffset,
    col + colOffset,
  ]).filter(
    ([neighborRow, neighborCol]) =>
      neighborRow >= 0 &&
      neighborRow < ROWS &&
      neighborCol >= 0 &&
      neighborCol < COLS,
  );
}

export function openConnectedCells(board, row, col) {
  const nextBoard = board.map((rowCells) =>
    rowCells.map((cell) => ({ ...cell })),
  );
  const queue = [[row, col]];

  while (queue.length > 0) {
    const [currentRow, currentCol] = queue.shift();
    const cell = nextBoard[currentRow][currentCol];

    if (cell.state !== CELL_STATE.CLOSED || cell.type === CELL_TYPE.MINE) {
      continue;
    }

    cell.state = CELL_STATE.OPENED;
    if (cell.neighborMines === 0) {
      queue.push(...getNeighbors(currentRow, currentCol));
    }
  }

  return nextBoard;
}

export function hasWon(board) {
  return board.every((row) =>
    row.every(
      (cell) =>
        cell.type === CELL_TYPE.MINE || cell.state === CELL_STATE.OPENED,
    ),
  );
}
