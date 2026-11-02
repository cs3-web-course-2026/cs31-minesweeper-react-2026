import {
  CELL_STATE,
  CELL_TYPE,
  COLS,
  MINES_COUNT,
  NEIGHBOUR_OFFSETS,
  ROWS,
} from '../constants/game';

function createCell() {
  return {
    type: CELL_TYPE.EMPTY,
    state: CELL_STATE.CLOSED,
    minesAround: 0,
  };
}

export function cloneBoard(board) {
  return board.map((row) => row.map((cell) => ({ ...cell })));
}

export function createEmptyBoard(rows = ROWS, cols = COLS) {
  return Array.from({ length: rows }, () =>
    Array.from({ length: cols }, createCell),
  );
}

export function isInsideBoard(board, row, col) {
  return row >= 0 && row < board.length && col >= 0 && col < board[0].length;
}

export function forEachNeighbour(board, row, col, callback) {
  NEIGHBOUR_OFFSETS.forEach(([rowOffset, colOffset]) => {
    const neighbourRow = row + rowOffset;
    const neighbourCol = col + colOffset;

    if (isInsideBoard(board, neighbourRow, neighbourCol)) {
      callback(board[neighbourRow][neighbourCol], neighbourRow, neighbourCol);
    }
  });
}

function plantMines(board, minesCount, safeRow, safeCol) {
  const rows = board.length;
  const cols = board[0].length;
  let planted = 0;

  while (planted < minesCount) {
    const row = Math.floor(Math.random() * rows);
    const col = Math.floor(Math.random() * cols);
    const isSafeCell = row === safeRow && col === safeCol;

    if (board[row][col].type === CELL_TYPE.EMPTY && !isSafeCell) {
      board[row][col].type = CELL_TYPE.MINE;
      planted += 1;
    }
  }
}

function countNeighbourMines(board) {
  board.forEach((row, rowIndex) => {
    row.forEach((cell, colIndex) => {
      if (cell.type === CELL_TYPE.MINE) {
        return;
      }

      let mines = 0;

      forEachNeighbour(board, rowIndex, colIndex, (neighbour) => {
        if (neighbour.type === CELL_TYPE.MINE) {
          mines += 1;
        }
      });

      cell.minesAround = mines;
    });
  });
}

export function generateBoard(safeRow, safeCol, minesCount = MINES_COUNT) {
  const board = createEmptyBoard();

  plantMines(board, minesCount, safeRow, safeCol);
  countNeighbourMines(board);

  return board;
}

export function countFlags(board) {
  return board.flat().filter((cell) => cell.state === CELL_STATE.FLAGGED)
    .length;
}
