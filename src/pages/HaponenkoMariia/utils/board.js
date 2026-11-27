import {
  CELL_TYPE,
  CELL_STATE,
  ROWS,
  COLS,
  MINES_COUNT,
  DIRECTIONS,
} from '../constants/game';

export function initEmptyBoard() {
  const newBoard = [];
  for (let rowIndex = 0; rowIndex < ROWS; rowIndex++) {
    const row = [];
    for (let colIndex = 0; colIndex < COLS; colIndex++) {
      row.push({
        type: CELL_TYPE.EMPTY,
        state: CELL_STATE.CLOSED,
        neighborMines: 0,
        exploded: false,
      });
    }
    newBoard.push(row);
  }
  return newBoard;
}

// Передаємо random як параметр за замовчуванням (вимога CodeRabbit)
export function generateMines(
  currentBoard,
  firstRow,
  firstCol,
  random = Math.random,
) {
  let minesPlaced = 0;
  const newBoard = currentBoard.map((row) => row.map((cell) => ({ ...cell })));

  while (minesPlaced < MINES_COUNT) {
    const rowIndex = Math.floor(random() * ROWS);
    const colIndex = Math.floor(random() * COLS);
    const isSafeZone =
      Math.abs(rowIndex - firstRow) <= 1 && Math.abs(colIndex - firstCol) <= 1;

    if (newBoard[rowIndex][colIndex].type !== CELL_TYPE.MINE && !isSafeZone) {
      newBoard[rowIndex][colIndex].type = CELL_TYPE.MINE;
      minesPlaced++;
    }
  }

  for (let rowIndex = 0; rowIndex < ROWS; rowIndex++) {
    for (let colIndex = 0; colIndex < COLS; colIndex++) {
      if (newBoard[rowIndex][colIndex].type === CELL_TYPE.MINE) continue;
      let count = 0;
      for (const [rowOffset, colOffset] of DIRECTIONS) {
        const neighborRow = rowIndex + rowOffset;
        const neighborCol = colIndex + colOffset;
        if (
          neighborRow >= 0 &&
          neighborRow < ROWS &&
          neighborCol >= 0 &&
          neighborCol < COLS
        ) {
          if (newBoard[neighborRow][neighborCol].type === CELL_TYPE.MINE) {
            count++;
          }
        }
      }
      newBoard[rowIndex][colIndex].neighborMines = count;
    }
  }
  return newBoard;
}

export function checkWinCondition(currentBoard) {
  let safeOpened = 0;
  const targetSafe = ROWS * COLS - MINES_COUNT;
  for (let rowIndex = 0; rowIndex < ROWS; rowIndex++) {
    for (let colIndex = 0; colIndex < COLS; colIndex++) {
      if (
        currentBoard[rowIndex][colIndex].type === CELL_TYPE.EMPTY &&
        currentBoard[rowIndex][colIndex].state === CELL_STATE.OPENED
      ) {
        safeOpened++;
      }
    }
  }
  return safeOpened === targetSafe;
}

export function countFlaggedCells(currentBoard) {
  let flaggedCount = 0;

  for (const row of currentBoard) {
    for (const cell of row) {
      if (cell.state === CELL_STATE.FLAGGED) {
        flaggedCount += 1;
      }
    }
  }

  return flaggedCount;
}

export function revealAllMines(currentBoard) {
  return currentBoard.map((row) =>
    row.map((cell) => {
      if (cell.type === CELL_TYPE.MINE) {
        return {
          ...cell,
          wasFlagged: cell.state === CELL_STATE.FLAGGED,
          state: CELL_STATE.OPENED,
        };
      }
      return { ...cell };
    }),
  );
}

export function toggleFlagCell(
  currentBoard,
  targetRow,
  targetCol,
  currentFlagsCount,
) {
  const newBoard = currentBoard.map((row) => row.map((cell) => ({ ...cell })));
  const cell = newBoard[targetRow][targetCol];

  let newFlagsCount = currentFlagsCount;

  if (cell.state === CELL_STATE.CLOSED) {
    cell.state = CELL_STATE.FLAGGED;
    newFlagsCount++;
  } else if (cell.state === CELL_STATE.FLAGGED) {
    cell.state = CELL_STATE.CLOSED;
    newFlagsCount--;
  }

  return { newBoard, newFlagsCount };
}