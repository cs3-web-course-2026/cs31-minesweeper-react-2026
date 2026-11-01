// Чиста логіка гри без React: усі функції повертають НОВІ об'єкти (імутабельність).

export const DIFFICULTIES = {
  beginner: { label: 'Новачок', rows: 9, cols: 9, mines: 10 },
  intermediate: { label: 'Любитель', rows: 16, cols: 16, mines: 40 },
  expert: { label: 'Профі', rows: 16, cols: 30, mines: 99 },
};

export const STATUS = {
  IDLE: 'idle',
  PLAYING: 'playing',
  WON: 'won',
  LOST: 'lost',
};

const createCell = () => ({
  isMine: false,
  isRevealed: false,
  isFlagged: false,
  isExploded: false,
  neighborMines: 0,
});

export function createEmptyBoard(rows, cols) {
  return Array.from({ length: rows }, () =>
    Array.from({ length: cols }, createCell),
  );
}

const cloneBoard = (board) => board.map((row) => row.map((cell) => ({ ...cell })));

export function getNeighbors(board, row, col) {
  const result = [];
  for (let dr = -1; dr <= 1; dr += 1) {
    for (let dc = -1; dc <= 1; dc += 1) {
      if (dr === 0 && dc === 0) continue;
      const r = row + dr;
      const c = col + dc;
      if (r >= 0 && r < board.length && c >= 0 && c < board[0].length) {
        result.push([r, c]);
      }
    }
  }
  return result;
}

// Міни розставляються після першого кліку, щоб перший хід ніколи не був програшним.
export function placeMines(board, mines, safeRow, safeCol) {
  const next = cloneBoard(board);
  const candidates = [];
  next.forEach((line, r) =>
    line.forEach((_, c) => {
      if (r !== safeRow || c !== safeCol) candidates.push([r, c]);
    }),
  );

  for (let i = 0; i < mines; i += 1) {
    const index = Math.floor(Math.random() * candidates.length);
    const [r, c] = candidates.splice(index, 1)[0];
    next[r][c].isMine = true;
  }

  next.forEach((line, r) =>
    line.forEach((cell, c) => {
      cell.neighborMines = getNeighbors(next, r, c).filter(
        ([nr, nc]) => next[nr][nc].isMine,
      ).length;
    }),
  );
  return next;
}

// Відкриття клітинки; якщо поруч немає мін — відкриваємо сусідів (flood fill).
export function revealCell(board, row, col) {
  const next = cloneBoard(board);
  const start = next[row][col];
  if (start.isRevealed || start.isFlagged) return next;

  if (start.isMine) {
    start.isRevealed = true;
    start.isExploded = true;
    return next;
  }

  const stack = [[row, col]];
  while (stack.length > 0) {
    const [r, c] = stack.pop();
    const cell = next[r][c];
    if (cell.isRevealed || cell.isFlagged) continue;
    cell.isRevealed = true;
    if (cell.neighborMines === 0) {
      getNeighbors(next, r, c).forEach(([nr, nc]) => stack.push([nr, nc]));
    }
  }
  return next;
}

export function toggleFlag(board, row, col) {
  const next = cloneBoard(board);
  const cell = next[row][col];
  if (!cell.isRevealed) cell.isFlagged = !cell.isFlagged;
  return next;
}

export function revealAllMines(board) {
  return board.map((line) =>
    line.map((cell) => (cell.isMine ? { ...cell, isRevealed: true } : cell)),
  );
}

export function flagAllMines(board) {
  return board.map((line) =>
    line.map((cell) => (cell.isMine ? { ...cell, isFlagged: true } : cell)),
  );
}

export const hasExploded = (board) =>
  board.some((line) => line.some((cell) => cell.isExploded));

// Перемога: усі клітинки без мін відкриті.
export const isWon = (board) =>
  board.every((line) => line.every((cell) => cell.isMine || cell.isRevealed));

export const countFlags = (board) =>
  board.reduce(
    (sum, line) => sum + line.filter((cell) => cell.isFlagged).length,
    0,
  );
