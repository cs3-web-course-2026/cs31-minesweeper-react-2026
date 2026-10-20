import { CELL_STATE, CELL_CONTENT, DIRECTIONS } from '../constants/game.js';
import { isInBounds } from './checks.js';


export function createCell() {
  return {
    type: CELL_CONTENT.EMPTY,
    content: CELL_CONTENT.EMPTY,
    state: CELL_STATE.CLOSED,
    neighborMines: 0,
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

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const cell = board[row][col];

      if (cell.content === CELL_CONTENT.EMPTY) {
        const adjacentCount = getNeighbours(row, col, rows, cols).filter(
          ([neighbourRow, neighbourCol]) =>
            board[neighbourRow][neighbourCol].content === CELL_CONTENT.MINE,
        ).length;

        cell.adjacentMines = adjacentCount;
        cell.neighborMines = adjacentCount;
      }
    }
  }
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
  let plantedMines = 0;

  while (plantedMines < totalMinesToPlace) {
    const row = Math.floor(Math.random() * rows);
    const col = Math.floor(Math.random() * cols);

    if (excludedRow !== null && row === excludedRow && col === excludedCol) {
      continue;
    }

    if (board[row][col].content !== CELL_CONTENT.MINE) {
      board[row][col].content = CELL_CONTENT.MINE;
      board[row][col].type = CELL_CONTENT.MINE;
      plantedMines++;
    }
  }

  calculateAdjacency(board);
}
