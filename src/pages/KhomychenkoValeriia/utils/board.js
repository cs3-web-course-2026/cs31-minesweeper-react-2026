import { CELL_STATE, CELL_TYPE } from '../constants/game';

export function createEmptyBoard(rows, cols) {
  const newBoard = [];
  for (let row = 0; row < rows; row += 1) {
    const rowCells = [];
    for (let col = 0; col < cols; col += 1) {
      rowCells.push({
        row,
        col,
        type: CELL_TYPE.EMPTY,
        state: CELL_STATE.CLOSED,
        neighborMines: 0,
        isExploded: false,
      });
    }
    newBoard.push(rowCells);
  }
  return newBoard;
}

export function getNeighbors(row, col, maxRows, maxCols) {
  const neighbors = [];
  for (let deltaRow = -1; deltaRow <= 1; deltaRow += 1) {
    for (let deltaCol = -1; deltaCol <= 1; deltaCol += 1) {
      if (deltaRow === 0 && deltaCol === 0) continue;
      const neighbourRow = row + deltaRow;
      const neighbourCol = col + deltaCol;
      if (
        neighbourRow >= 0 &&
        neighbourRow < maxRows &&
        neighbourCol >= 0 &&
        neighbourCol < maxCols
      ) {
        neighbors.push([neighbourRow, neighbourCol]);
      }
    }
  }
  return neighbors;
}

export function countNeighbourMines(targetBoard, rows, cols) {
  for (let row = 0; row < rows; row += 1) {
    for (let col = 0; col < cols; col += 1) {
      if (targetBoard[row][col].type === CELL_TYPE.MINE) continue;

      let count = 0;
      const neighbors = getNeighbors(row, col, rows, cols);
      neighbors.forEach(([neighbourRow, neighbourCol]) => {
        if (targetBoard[neighbourRow][neighbourCol].type === CELL_TYPE.MINE) {
          count += 1;
        }
      });
      targetBoard[row][col].neighborMines = count;
    }
  }
}

export function generateField(rows, cols, minesCount) {
  const newBoard = createEmptyBoard(rows, cols);
  let placed = 0;
  while (placed < minesCount) {
    const row = Math.floor(Math.random() * rows);
    const col = Math.floor(Math.random() * cols);
    if (newBoard[row][col].type !== CELL_TYPE.MINE) {
      newBoard[row][col].type = CELL_TYPE.MINE;
      placed += 1;
    }
  }
  countNeighbourMines(newBoard, rows, cols);
  return newBoard;
}

export function cloneBoard(board) {
  return board.map((rowCells) => rowCells.map((cell) => ({ ...cell })));
}

export function revealRecursive(board, row, col, rows, cols) {
  if (row < 0 || row >= rows || col < 0 || col >= cols) return;

  const cell = board[row][col];
  if (cell.state === CELL_STATE.OPENED || cell.state === CELL_STATE.FLAGGED) {
    return;
  }

  cell.state = CELL_STATE.OPENED;

  if (cell.neighborMines === 0 && cell.type === CELL_TYPE.EMPTY) {
    const neighbors = getNeighbors(row, col, rows, cols);
    neighbors.forEach(([neighbourRow, neighbourCol]) => {
      if (board[neighbourRow][neighbourCol].state === CELL_STATE.CLOSED) {
        revealRecursive(board, neighbourRow, neighbourCol, rows, cols);
      }
    });
  }
}

export function checkWin(board, rows, cols, minesCount) {
  let openedSafeCount = 0;
  const totalSafeCells = rows * cols - minesCount;

  for (let row = 0; row < rows; row += 1) {
    for (let col = 0; col < cols; col += 1) {
      const cell = board[row][col];
      if (cell.type === CELL_TYPE.EMPTY && cell.state === CELL_STATE.OPENED) {
        openedSafeCount += 1;
      }
    }
  }

  return openedSafeCount === totalSafeCells;
}
