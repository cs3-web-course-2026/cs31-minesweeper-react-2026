import { CELL_STATE, CELL_CONTENT, DIRECTIONS } from '../constants/game.js';
import { isInBounds } from './checks.js';


export function createCell() {
  return {
    content: CELL_CONTENT.EMPTY,
    state: CELL_STATE.CLOSED,
    adjacentMines: 0,
    isExploded: false,
  };
}


export function createBoard(rows, cols) {
  const newBoard = [];

  for (let row = 0; row < rows; row++) {
    const rowCells = [];

    for (let col = 0; col < cols; col++) {
      rowCells.push(createCell());
    }

    newBoard.push(rowCells);
  }

  return newBoard;
}


export function getNeighbours(row, col, rows, cols) {
  const neighbours = [];

  for (const [directionalRow, directionalCol] of DIRECTIONS) {
    const neighbourRow = row + directionalRow;
    const neighbourCol = col + directionalCol;

    if (isInBounds(neighbourRow, neighbourCol, rows, cols)) {
      neighbours.push([neighbourRow, neighbourCol]);
    }
  }

  return neighbours;
}


export function calculateAdjacency(board) {
  const rows = board.length;
  const cols = board[0].length;

  return board.map((rowCells, row) =>
    rowCells.map((cell, col) => {
      if (cell.content !== CELL_CONTENT.EMPTY) {
        return { ...cell };
      }

      const adjacentMines = getNeighbours(row, col, rows, cols).filter(
        ([neighbourRow, neighbourCol]) =>
          board[neighbourRow][neighbourCol].content === CELL_CONTENT.MINE,
      ).length;

      return { ...cell, adjacentMines };
    }),
  );
}


export function placeMines(
  board,
  rows,
  cols,
  mineCount,
  excludedRow = null,
  excludedCol = null,
) {
  const totalMinesToPlace = Math.min(mineCount, rows * cols - (excludedRow !== null ? 1 : 0));
  const minePositions = new Set();

  while (minePositions.size < totalMinesToPlace) {
    const row = Math.floor(Math.random() * rows);
    const col = Math.floor(Math.random() * cols);

    if (excludedRow !== null && row === excludedRow && col === excludedCol) {
      continue;
    }

    minePositions.add(`${row}-${col}`);
  }

  const boardWithMines = board.map((rowCells, row) =>
    rowCells.map((cell, col) =>
      minePositions.has(`${row}-${col}`)
        ? { ...cell, content: CELL_CONTENT.MINE }
        : { ...cell },
    ),
  );

  return calculateAdjacency(boardWithMines);
}
