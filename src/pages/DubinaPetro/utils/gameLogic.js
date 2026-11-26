import { CELL_STATE, COLS, MINES_COUNT, ROWS } from '../constants';

function createEmptyCell() {
  return {
    type: 'empty',
    neighborMines: 0,
    state: CELL_STATE.CLOSED,
  };
}

export function getNeighbours(row, col, rows = ROWS, cols = COLS) {
  const neighbours = [];

  for (let rowOffset = -1; rowOffset <= 1; rowOffset += 1) {
    for (let colOffset = -1; colOffset <= 1; colOffset += 1) {
      const neighbourRow = row + rowOffset;
      const neighbourCol = col + colOffset;
      const isSameCell = rowOffset === 0 && colOffset === 0;
      const isInsideBoard = neighbourRow >= 0 && neighbourRow < rows
        && neighbourCol >= 0 && neighbourCol < cols;

      if (!isSameCell && isInsideBoard) {
        neighbours.push([neighbourRow, neighbourCol]);
      }
    }
  }

  return neighbours;
}

// створює нове поле з унікальними мінами та кількістю сусідів
export function generateBoard(rows = ROWS, cols = COLS, minesCount = MINES_COUNT) {
  const board = Array.from(
    { length: rows },
    () => Array.from({ length: cols }, createEmptyCell),
  );
  let placedMines = 0;

  while (placedMines < minesCount) {
    const row = Math.floor(Math.random() * rows);
    const col = Math.floor(Math.random() * cols);

    if (board[row][col].type === 'mine') {
      continue;
    }

    board[row][col] = { ...board[row][col], type: 'mine' };
    placedMines += 1;
  }

  return board.map((boardRow, row) => (
    boardRow.map((cell, col) => {
      if (cell.type === 'mine') {
        return cell;
      }

      const neighborMines = getNeighbours(row, col, rows, cols)
        .filter(([neighbourRow, neighbourCol]) => board[neighbourRow][neighbourCol].type === 'mine')
        .length;

      return { ...cell, neighborMines };
    })
  ));
}

export function getFlagsCount(board) {
  return board.flat().filter((cell) => cell.state === CELL_STATE.FLAGGED).length;
}

export function hasWon(board) {
  return board.flat().every((cell) => cell.type === 'mine' || cell.state === CELL_STATE.OPENED);
}

// відкриває клітинку та порожню область без зміни попереднього стану
export function revealCells(board, startRow, startCol) {
  const nextBoard = board.map((row) => row.map((cell) => ({ ...cell })));
  const cellsToOpen = [[startRow, startCol]];
  const visited = new Set();

  while (cellsToOpen.length > 0) {
    const [row, col] = cellsToOpen.pop();
    const cellKey = `${row}-${col}`;
    const cell = nextBoard[row][col];

    if (visited.has(cellKey) || cell.state === CELL_STATE.FLAGGED || cell.state === CELL_STATE.OPENED) {
      continue;
    }

    visited.add(cellKey);
    cell.state = CELL_STATE.OPENED;

    if (cell.type === 'empty' && cell.neighborMines === 0) {
      getNeighbours(row, col).forEach((neighbour) => cellsToOpen.push(neighbour));
    }
  }

  return nextBoard;
}

export function revealMines(board) {
  return board.map((row) => row.map((cell) => (
    cell.type === 'mine' ? { ...cell, state: CELL_STATE.OPENED } : cell
  )));
}

export function toggleCellFlag(board, row, col, minesCount = MINES_COUNT) {
  const target = board[row][col];

  if (target.state === CELL_STATE.OPENED) {
    return board;
  }

  const canAddFlag = getFlagsCount(board) < minesCount;
  let nextState = CELL_STATE.CLOSED;

  if (target.state === CELL_STATE.FLAGGED) {
    nextState = CELL_STATE.CLOSED;
  } else if (canAddFlag) {
    nextState = CELL_STATE.FLAGGED;
  }

  if (nextState === target.state) {
    return board;
  }

  return board.map((boardRow, rowIndex) => (
    boardRow.map((cell, colIndex) => (
      rowIndex === row && colIndex === col ? { ...cell, state: nextState } : cell
    ))
  ));
}
