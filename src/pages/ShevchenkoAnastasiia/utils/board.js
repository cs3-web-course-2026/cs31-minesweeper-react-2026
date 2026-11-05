import { CELL_CONTENT, CELL_STATE, NEIGHBOUR_OFFSETS } from '../constants/game';
import { isInBounds } from './checks';

export function createCell() {
  return {
    content: CELL_CONTENT.EMPTY,
    state: CELL_STATE.CLOSED,
    adjacentMines: 0,
  };
}

export function createBoard(rows, cols) {
  return Array.from({ length: rows }, () =>
    Array.from({ length: cols }, createCell),
  );
}

export function getNeighbourPositions(row, col, rows, cols) {
  return NEIGHBOUR_OFFSETS.map(([rowOffset, colOffset]) => ({
    row: row + rowOffset,
    col: col + colOffset,
  })).filter((position) => isInBounds(position.row, position.col, rows, cols));
}

function listPositions(rows, cols) {
  return Array.from({ length: rows * cols }, (_, index) => ({
    row: Math.floor(index / cols),
    col: index % cols,
  }));
}

function shuffle(items, random) {
  const shuffled = [...items];

  for (let index = shuffled.length - 1; index > 0; index--) {
    const swapIndex = Math.floor(random() * (index + 1));
    [shuffled[index], shuffled[swapIndex]] = [
      shuffled[swapIndex],
      shuffled[index],
    ];
  }

  return shuffled;
}

function pickMinePositions(rows, cols, minesCount, safeRow, safeCol, random) {
  const safeZone = [
    { row: safeRow, col: safeCol },
    ...getNeighbourPositions(safeRow, safeCol, rows, cols),
  ];
  const isOutside = (zone) => (position) =>
    !zone.some(({ row, col }) => row === position.row && col === position.col);
  const positions = listPositions(rows, cols);
  const roomyCandidates = positions.filter(isOutside(safeZone));
  const candidates =
    roomyCandidates.length >= minesCount
      ? roomyCandidates
      : positions.filter(isOutside(safeZone.slice(0, 1)));

  return shuffle(candidates, random).slice(0, minesCount);
}

export function placeMines(
  board,
  minesCount,
  safeRow,
  safeCol,
  random = Math.random,
) {
  const rows = board.length;
  const cols = board[0].length;
  const minePositions = pickMinePositions(
    rows,
    cols,
    minesCount,
    safeRow,
    safeCol,
    random,
  );
  const nextBoard = board.map((boardRow) => [...boardRow]);

  minePositions.forEach(({ row, col }) => {
    nextBoard[row][col] = {
      ...nextBoard[row][col],
      content: CELL_CONTENT.MINE,
    };
  });

  return nextBoard;
}

export function calculateAdjacency(board) {
  const rows = board.length;
  const cols = board[0].length;

  return board.map((boardRow, row) =>
    boardRow.map((cell, col) => {
      if (cell.content === CELL_CONTENT.MINE) {
        return cell;
      }

      const adjacentMines = getNeighbourPositions(row, col, rows, cols).filter(
        (position) =>
          board[position.row][position.col].content === CELL_CONTENT.MINE,
      ).length;

      return { ...cell, adjacentMines };
    }),
  );
}

export function populateBoard(board, minesCount, safeRow, safeCol, random) {
  return calculateAdjacency(
    placeMines(board, minesCount, safeRow, safeCol, random),
  );
}
