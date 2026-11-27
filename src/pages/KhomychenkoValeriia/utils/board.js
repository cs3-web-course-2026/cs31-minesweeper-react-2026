import { CELL_STATE, CELL_TYPE } from '../constants/game';

export function cloneBoard(board) {
  return board.map((rowCells) => rowCells.map((cell) => ({ ...cell })));
}

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
  const nextBoard = cloneBoard(targetBoard);

  for (let row = 0; row < rows; row += 1) {
    for (let col = 0; col < cols; col += 1) {
      if (nextBoard[row][col].type === CELL_TYPE.MINE) continue;

      let count = 0;
      const neighbors = getNeighbors(row, col, rows, cols);
      neighbors.forEach(([neighbourRow, neighbourCol]) => {
        if (nextBoard[neighbourRow][neighbourCol].type === CELL_TYPE.MINE) {
          count += 1;
        }
      });
      nextBoard[row][col].neighborMines = count;
    }
  }

  return nextBoard;
}

export function generateField(rows, cols, minesCount) {
  const emptyBoard = createEmptyBoard(rows, cols);
  let placed = 0;

  while (placed < minesCount) {
    const row = Math.floor(Math.random() * rows);
    const col = Math.floor(Math.random() * cols);
    if (emptyBoard[row][col].type !== CELL_TYPE.MINE) {
      emptyBoard[row][col].type = CELL_TYPE.MINE;
      placed += 1;
    }
  }

  return countNeighbourMines(emptyBoard, rows, cols);
}

function revealRecursiveInCopy(board, row, col, rows, cols) {
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
        revealRecursiveInCopy(board, neighbourRow, neighbourCol, rows, cols);
      }
    });
  }
}

export function revealRecursive(board, row, col, rows, cols) {
  const nextBoard = cloneBoard(board);
  revealRecursiveInCopy(nextBoard, row, col, rows, cols);
  return nextBoard;
}

export function prepareFirstOpenBoard(
  currentBoard,
  row,
  col,
  rows,
  cols,
  minesCount,
) {
  let nextBoard = cloneBoard(currentBoard);
  let regenerated = false;

  while (
    nextBoard[row][col].type === CELL_TYPE.MINE ||
    nextBoard[row][col].neighborMines > 0
  ) {
    nextBoard = generateField(rows, cols, minesCount);
    regenerated = true;
  }

  return { board: nextBoard, regenerated };
}

export function revealMinesOnLoss(
  currentBoard,
  explodedRow,
  explodedCol,
  rows,
  cols,
) {
  const nextBoard = cloneBoard(currentBoard);

  for (let row = 0; row < rows; row += 1) {
    for (let col = 0; col < cols; col += 1) {
      if (nextBoard[row][col].type === CELL_TYPE.MINE) {
        nextBoard[row][col].state = CELL_STATE.OPENED;
        if (row === explodedRow && col === explodedCol) {
          nextBoard[row][col].isExploded = true;
        }
      }
    }
  }

  return nextBoard;
}

export function toggleFlagOnBoard(currentBoard, row, col, currentFlagsPlaced) {
  const nextBoard = cloneBoard(currentBoard);
  const targetCell = nextBoard[row][col];

  if (targetCell.state === CELL_STATE.OPENED) {
    return { board: nextBoard, flagsPlaced: currentFlagsPlaced };
  }

  if (targetCell.state === CELL_STATE.CLOSED) {
    targetCell.state = CELL_STATE.FLAGGED;
    return { board: nextBoard, flagsPlaced: currentFlagsPlaced + 1 };
  }

  if (targetCell.state === CELL_STATE.FLAGGED) {
    targetCell.state = CELL_STATE.CLOSED;
    return { board: nextBoard, flagsPlaced: currentFlagsPlaced - 1 };
  }

  return { board: nextBoard, flagsPlaced: currentFlagsPlaced };
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
