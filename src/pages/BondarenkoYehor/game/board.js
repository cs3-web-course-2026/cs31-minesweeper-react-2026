import { CELL_STATE, CELL_TYPE } from './constants';

const createCell = () => ({
  type: CELL_TYPE.EMPTY,
  neighborMines: 0,
  state: CELL_STATE.CLOSED,
});

const cloneBoard = (board) => board.map((line) => line.map((cell) => ({ ...cell })));

function forEachNeighbor(grid, row, col, callback) {
  for (let dRow = -1; dRow <= 1; dRow++) {
    for (let dCol = -1; dCol <= 1; dCol++) {
      if (dRow === 0 && dCol === 0) continue;
      const r = row + dRow;
      const c = col + dCol;
      if (r >= 0 && r < grid.length && c >= 0 && c < grid[0].length) {
        callback(grid[r][c], r, c);
      }
    }
  }
}

function placeMines(grid, rows, cols, minesCount) {
  let placed = 0;
  while (placed < minesCount) {
    const row = Math.floor(Math.random() * rows);
    const col = Math.floor(Math.random() * cols);
    if (grid[row][col].type === CELL_TYPE.MINE) continue;
    grid[row][col].type = CELL_TYPE.MINE;
    placed++;
  }
}

function countNeighbourMines(grid) {
  grid.forEach((line, row) => {
    line.forEach((cell, col) => {
      if (cell.type === CELL_TYPE.MINE) return;
      let count = 0;
      forEachNeighbor(grid, row, col, (neighbor) => {
        if (neighbor.type === CELL_TYPE.MINE) count++;
      });
      cell.neighborMines = count;
    });
  });
}

export function createBoard({ rows, cols, minesCount }) {
  const grid = Array.from({ length: rows }, () => Array.from({ length: cols }, createCell));
  placeMines(grid, rows, cols, minesCount);
  countNeighbourMines(grid);
  return grid;
}

export function revealCells(board, row, col) {
  const next = cloneBoard(board);
  const stack = [[row, col]];

  while (stack.length > 0) {
    const [r, c] = stack.pop();
    const cell = next[r][c];
    if (cell.state !== CELL_STATE.CLOSED) continue;

    cell.state = CELL_STATE.OPENED;
    if (cell.neighborMines === 0) {
      forEachNeighbor(next, r, c, (_, nr, nc) => stack.push([nr, nc]));
    }
  }
  return next;
}

export const countFlags = (board) =>
  board.flat().filter((cell) => cell.state === CELL_STATE.FLAGGED).length;

export const hasWon = (board) =>
  board.every((line) =>
    line.every((cell) => cell.type === CELL_TYPE.MINE || cell.state === CELL_STATE.OPENED),
  );

export function toggleFlagAt(board, row, col, maxFlags) {
  const { state } = board[row][col];
  if (state === CELL_STATE.OPENED) return board;
  if (state === CELL_STATE.CLOSED && countFlags(board) >= maxFlags) return board;

  const next = cloneBoard(board);
  next[row][col].state = state === CELL_STATE.FLAGGED ? CELL_STATE.CLOSED : CELL_STATE.FLAGGED;
  return next;
}
