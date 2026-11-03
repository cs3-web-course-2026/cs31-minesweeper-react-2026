// Чиста логіка гри: без React і без DOM. Усі функції повертають нову дошку (імутабельно).

export const GAME_STATUS = {
  PROCESS: 'process',
  WIN: 'win',
  LOSE: 'lose',
};

export const CELL_STATE = {
  CLOSED: 'closed',
  OPENED: 'opened',
  FLAGGED: 'flagged',
};

export const DEFAULT_CONFIG = {
  rows: 10,
  cols: 10,
  minesCount: 15,
};

const cloneBoard = (board) => board.map((row) => row.map((cell) => ({ ...cell })));

function getNeighbors(board, row, col) {
  const result = [];
  for (let rowOffset = -1; rowOffset <= 1; rowOffset++) {
    for (let colOffset = -1; colOffset <= 1; colOffset++) {
      if (rowOffset === 0 && colOffset === 0) continue;
      const neighborRow = row + rowOffset;
      const neighborCol = col + colOffset;
      const insideBoard =
        neighborRow >= 0 &&
        neighborRow < board.length &&
        neighborCol >= 0 &&
        neighborCol < board[0].length;
      if (insideBoard) result.push({ row: neighborRow, col: neighborCol });
    }
  }
  return result;
}

export function createBoard({ rows, cols, minesCount }) {
  const board = Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => ({
      isMine: false,
      neighborMines: 0,
      state: CELL_STATE.CLOSED,
    }))
  );

  const maxMines = Math.min(minesCount, rows * cols - 1); // захист від нескінченного циклу
  let placed = 0;
  while (placed < maxMines) {
    const row = Math.floor(Math.random() * rows);
    const col = Math.floor(Math.random() * cols);
    if (!board[row][col].isMine) {
      board[row][col].isMine = true;
      placed++;
    }
  }

  board.forEach((cells, row) => {
    cells.forEach((cell, col) => {
      if (cell.isMine) return;
      cell.neighborMines = getNeighbors(board, row, col).filter(
        (neighbor) => board[neighbor.row][neighbor.col].isMine
      ).length;
    });
  });

  return board;
}

// Відкриває клітинку та (для порожніх) усіх сусідів. Мутує переданий (вже клонований) board.
function revealFrom(board, row, col) {
  const stack = [{ row, col }];
  while (stack.length > 0) {
    const current = stack.pop();
    const cell = board[current.row][current.col];
    if (cell.state !== CELL_STATE.CLOSED) continue; // opened або flagged

    cell.state = CELL_STATE.OPENED;
    if (cell.neighborMines === 0) {
      stack.push(...getNeighbors(board, current.row, current.col));
    }
  }
}

function flagAllMines(board) {
  board.flat().forEach((cell) => {
    if (cell.isMine) cell.state = CELL_STATE.FLAGGED;
  });
}

export function getGameStatus(board) {
  const cells = board.flat();
  if (cells.some((cell) => cell.isMine && cell.state === CELL_STATE.OPENED)) {
    return GAME_STATUS.LOSE;
  }
  if (cells.every((cell) => cell.isMine || cell.state === CELL_STATE.OPENED)) {
    return GAME_STATUS.WIN;
  }
  return GAME_STATUS.PROCESS;
}

export function countFlags(board) {
  return board.flat().filter((cell) => cell.state === CELL_STATE.FLAGGED).length;
}

export function hasStarted(board) {
  return board.flat().some((cell) => cell.state === CELL_STATE.OPENED);
}

export function openCell(board, row, col) {
  const target = board[row][col];
  if (target.state !== CELL_STATE.CLOSED) return board;

  const next = cloneBoard(board);
  if (target.isMine) {
    next[row][col].state = CELL_STATE.OPENED;
    return next;
  }

  revealFrom(next, row, col);
  if (getGameStatus(next) === GAME_STATUS.WIN) flagAllMines(next);
  return next;
}

export function toggleFlag(board, row, col, minesCount) {
  const target = board[row][col];
  if (target.state === CELL_STATE.OPENED) return board;
  // прапорців не більше, ніж мін
  if (target.state === CELL_STATE.CLOSED && countFlags(board) >= minesCount) return board;

  const next = cloneBoard(board);
  next[row][col].state =
    target.state === CELL_STATE.FLAGGED ? CELL_STATE.CLOSED : CELL_STATE.FLAGGED;
  return next;
}
