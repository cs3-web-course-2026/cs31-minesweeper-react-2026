import { CELL_STATE, CELL_TYPE, NEIGHBOUR_OFFSETS } from '../constants/game.js';

export function isInBounds(board, row, col) {
  return (
    Number.isInteger(row) &&
    Number.isInteger(col) &&
    row >= 0 &&
    row < board.length &&
    col >= 0 &&
    col < board[row].length
  );
}

export function getNeighbours(board, row, col) {
  return NEIGHBOUR_OFFSETS.map(([rowOffset, colOffset]) => [
    row + rowOffset,
    col + colOffset,
  ]).filter(([neighbourRow, neighbourCol]) =>
    isInBounds(board, neighbourRow, neighbourCol),
  );
}

export function createEmptyBoard(rows, cols) {
  return Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => ({
      type: CELL_TYPE.EMPTY,
      state: CELL_STATE.CLOSED,
      neighborMines: 0,
    })),
  );
}

export function createBoard({ rows, cols, minesCount }, randomValues) {
  const cellsCount = rows * cols;

  if (
    !Number.isInteger(rows) ||
    !Number.isInteger(cols) ||
    rows <= 0 ||
    cols <= 0 ||
    !Number.isInteger(minesCount) ||
    minesCount < 0 ||
    minesCount >= cellsCount
  ) {
    throw new RangeError('Некоректний розмір поля або кількість мін.');
  }

  if (
    randomValues.length !== minesCount ||
    randomValues.some(
      (value) => !Number.isFinite(value) || value < 0 || value >= 1,
    )
  ) {
    throw new RangeError(
      'Для кожної міни потрібне число від 0 включно до 1 невключно.',
    );
  }

  const board = createEmptyBoard(rows, cols);
  const positions = Array.from(
    { length: cellsCount },
    (_, position) => position,
  );

  randomValues.forEach((value, mineIndex) => {
    const selectedIndex =
      mineIndex + Math.floor(value * (cellsCount - mineIndex));
    [positions[mineIndex], positions[selectedIndex]] = [
      positions[selectedIndex],
      positions[mineIndex],
    ];
    const position = positions[mineIndex];
    board[Math.floor(position / cols)][position % cols].type = CELL_TYPE.MINE;
  });

  return board.map((cells, row) =>
    cells.map((cell, col) => ({
      ...cell,
      neighborMines: getNeighbours(board, row, col).filter(
        ([neighbourRow, neighbourCol]) =>
          board[neighbourRow][neighbourCol].type === CELL_TYPE.MINE,
      ).length,
    })),
  );
}

export function countFlags(board) {
  return board.flat().filter((cell) => cell.state === CELL_STATE.FLAGGED)
    .length;
}

export function checkWinCondition(board) {
  return board.every((cells) =>
    cells.every(
      (cell) =>
        cell.type === CELL_TYPE.MINE || cell.state === CELL_STATE.OPENED,
    ),
  );
}

function cloneBoard(board) {
  return board.map((cells) => cells.map((cell) => ({ ...cell })));
}

export function revealCell(board, row, col) {
  if (
    !isInBounds(board, row, col) ||
    board[row][col].state !== CELL_STATE.CLOSED
  ) {
    return board;
  }

  const nextBoard = cloneBoard(board);

  function revealNeighbours(currentRow, currentCol) {
    const cell = nextBoard[currentRow][currentCol];

    if (cell.state !== CELL_STATE.CLOSED) {
      return;
    }

    cell.state = CELL_STATE.OPENED;

    if (cell.type === CELL_TYPE.MINE || cell.neighborMines !== 0) {
      return;
    }

    getNeighbours(nextBoard, currentRow, currentCol).forEach(
      ([neighbourRow, neighbourCol]) =>
        revealNeighbours(neighbourRow, neighbourCol),
    );
  }

  revealNeighbours(row, col);

  return nextBoard;
}

export function toggleFlag(board, row, col, minesCount) {
  if (
    !isInBounds(board, row, col) ||
    board[row][col].state === CELL_STATE.OPENED
  ) {
    return board;
  }

  const cell = board[row][col];

  if (cell.state === CELL_STATE.CLOSED && countFlags(board) >= minesCount) {
    return board;
  }

  const nextBoard = cloneBoard(board);
  nextBoard[row][col].state =
    cell.state === CELL_STATE.FLAGGED ? CELL_STATE.CLOSED : CELL_STATE.FLAGGED;

  return nextBoard;
}
