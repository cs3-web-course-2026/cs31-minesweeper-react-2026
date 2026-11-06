import {
  CELL_CONTENT,
  CELL_STATE,
  NEIGHBOUR_DIRECTIONS,
} from '../constants/game';

import { isInBounds } from './checks';

export function createCellKey(row, col) {
  return `${row}-${col}`;
}

function createCell() {
  return {
    content: CELL_CONTENT.EMPTY,
    state: CELL_STATE.CLOSED,
    adjacentMines: 0,
  };
}

export function createEmptyBoard(rows, cols) {
  return Array.from({ length: rows }, () =>
    Array.from({ length: cols }, createCell),
  );
}

export function getNeighbourPositions(board, row, col) {
  return NEIGHBOUR_DIRECTIONS.map(([directionalRow, directionalCol]) => ({
    row: row + directionalRow,
    col: col + directionalCol,
  })).filter(({ row: neighbourRow, col: neighbourCol }) =>
    isInBounds(board, neighbourRow, neighbourCol),
  );
}

export function placeMines(board, mineCount, random = Math.random) {
  const rows = board.length;
  const cols = board[0].length;
  const minesToPlace = Math.min(mineCount, rows * cols);
  const mineKeys = new Set();

  while (mineKeys.size < minesToPlace) {
    const mineRow = Math.floor(random() * rows);
    const mineCol = Math.floor(random() * cols);

    mineKeys.add(createCellKey(mineRow, mineCol));
  }

  return board.map((boardRow, rowIndex) =>
    boardRow.map((cell, colIndex) =>
      mineKeys.has(createCellKey(rowIndex, colIndex))
        ? { ...cell, content: CELL_CONTENT.MINE }
        : cell,
    ),
  );
}

export function countAdjacentMines(board, row, col) {
  return getNeighbourPositions(board, row, col).filter(
    ({ row: neighbourRow, col: neighbourCol }) =>
      board[neighbourRow][neighbourCol].content === CELL_CONTENT.MINE,
  ).length;
}

export function calculateAdjacency(board) {
  return board.map((boardRow, rowIndex) =>
    boardRow.map((cell, colIndex) => {
      if (cell.content === CELL_CONTENT.MINE) {
        return { ...cell, adjacentMines: 0 };
      }

      return {
        ...cell,
        adjacentMines: countAdjacentMines(board, rowIndex, colIndex),
      };
    }),
  );
}

export function createBoard(rows, cols, mineCount, random = Math.random) {
  const emptyBoard = createEmptyBoard(rows, cols);
  const boardWithMines = placeMines(emptyBoard, mineCount, random);

  return calculateAdjacency(boardWithMines);
}

function findFirstEmptyPosition(board) {
  for (let rowIndex = 0; rowIndex < board.length; rowIndex++) {
    for (let colIndex = 0; colIndex < board[rowIndex].length; colIndex++) {
      if (board[rowIndex][colIndex].content === CELL_CONTENT.EMPTY) {
        return { row: rowIndex, col: colIndex };
      }
    }
  }

  return null;
}

// The first reveal must never hit a mine: the mine is moved to the first
// empty cell (deterministic, so the function stays pure).
export function ensureSafeFirstReveal(board, row, col) {
  if (board[row][col].content !== CELL_CONTENT.MINE) {
    return board;
  }

  const targetPosition = findFirstEmptyPosition(board);

  if (targetPosition === null) {
    return board;
  }

  const relocatedBoard = board.map((boardRow, rowIndex) =>
    boardRow.map((cell, colIndex) => {
      if (rowIndex === row && colIndex === col) {
        return { ...cell, content: CELL_CONTENT.EMPTY };
      }

      if (rowIndex === targetPosition.row && colIndex === targetPosition.col) {
        return { ...cell, content: CELL_CONTENT.MINE };
      }

      return cell;
    }),
  );

  return calculateAdjacency(relocatedBoard);
}
