import {
  CELL_STATE,
  CELL_TYPE,
  GAME_STATUS,
  NEIGHBOR_OFFSETS,
} from './constants';

const createCell = () => ({
  type: CELL_TYPE.EMPTY,
  neighborMines: 0,
  state: CELL_STATE.CLOSED,
  exploded: false,
});

const cloneBoard = (board) =>
  board.map((rowCells) => rowCells.map((cell) => ({ ...cell })));

function getNeighbors(board, row, col) {
  return NEIGHBOR_OFFSETS.map(([rowOffset, colOffset]) => ({
    row: row + rowOffset,
    col: col + colOffset,
  }))
    .filter((position) => board[position.row]?.[position.col] !== undefined)
    .map((position) => ({
      ...position,
      cell: board[position.row][position.col],
    }));
}

export function generateField(rows, cols, minesCount, random = Math.random) {
  const board = Array.from({ length: rows }, () =>
    Array.from({ length: cols }, createCell),
  );

  let placedMines = 0;
  while (placedMines < minesCount) {
    const row = Math.floor(random() * rows);
    const col = Math.floor(random() * cols);

    if (board[row][col].type === CELL_TYPE.MINE) continue;

    board[row][col].type = CELL_TYPE.MINE;
    placedMines += 1;
  }

  return board;
}

// Повертає нове поле, у якому порожні клітинки містять кількість мін навколо
export function countNeighbourMines(board) {
  const nextBoard = cloneBoard(board);

  nextBoard.forEach((rowCells, row) => {
    rowCells.forEach((cell, col) => {
      if (cell.type === CELL_TYPE.MINE) return;

      cell.neighborMines = getNeighbors(nextBoard, row, col).filter(
        (neighbor) => neighbor.cell.type === CELL_TYPE.MINE,
      ).length;
    });
  });

  return nextBoard;
}

export const createBoard = (rows, cols, minesCount, random = Math.random) =>
  countNeighbourMines(generateField(rows, cols, minesCount, random));

function revealCell(board, row, col) {
  const cell = board[row][col];
  if (cell.state !== CELL_STATE.CLOSED) return;

  cell.state = CELL_STATE.OPENED;

  if (cell.neighborMines !== 0) return;

  getNeighbors(board, row, col).forEach((neighbor) =>
    revealCell(board, neighbor.row, neighbor.col),
  );
}

const isAllSafeCellsOpened = (board) =>
  board
    .flat()
    .every(
      (cell) =>
        cell.type === CELL_TYPE.MINE || cell.state === CELL_STATE.OPENED,
    );

function revealMines(board) {
  board.flat().forEach((cell) => {
    if (cell.type === CELL_TYPE.MINE && cell.state === CELL_STATE.CLOSED) {
      cell.state = CELL_STATE.OPENED;
    }
  });
}

function flagMines(board) {
  board.flat().forEach((cell) => {
    if (cell.type === CELL_TYPE.MINE) cell.state = CELL_STATE.FLAGGED;
  });
}

export const getFlagsLeft = (board, minesCount) =>
  minesCount -
  board.flat().filter((cell) => cell.state === CELL_STATE.FLAGGED).length;

// Повертає { board, status }: нове поле та новий статус гри
export function openCell(board, row, col) {
  if (board[row][col].state !== CELL_STATE.CLOSED) {
    return { board, status: GAME_STATUS.PROCESS };
  }

  const nextBoard = cloneBoard(board);

  if (nextBoard[row][col].type === CELL_TYPE.MINE) {
    nextBoard[row][col].exploded = true;
    revealMines(nextBoard);
    return { board: nextBoard, status: GAME_STATUS.LOSE };
  }

  revealCell(nextBoard, row, col);

  if (isAllSafeCellsOpened(nextBoard)) {
    flagMines(nextBoard);
    return { board: nextBoard, status: GAME_STATUS.WIN };
  }

  return { board: nextBoard, status: GAME_STATUS.PROCESS };
}

export function toggleFlag(board, row, col, minesCount) {
  const { state } = board[row][col];
  const canAddFlag =
    state === CELL_STATE.CLOSED && getFlagsLeft(board, minesCount) > 0;
  const canRemoveFlag = state === CELL_STATE.FLAGGED;

  if (!canAddFlag && !canRemoveFlag) return board;

  const nextBoard = cloneBoard(board);
  nextBoard[row][col].state = canRemoveFlag
    ? CELL_STATE.CLOSED
    : CELL_STATE.FLAGGED;
  return nextBoard;
}
