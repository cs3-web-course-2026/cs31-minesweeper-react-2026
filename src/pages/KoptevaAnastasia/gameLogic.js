export const ROWS = 10;
export const COLS = 10;
export const MINES_COUNT = 15;
export const SECOND = 1000;

export const CELL_TYPE = {
  EMPTY: 'empty',
  MINE: 'mine',
};

export const CELL_STATE = {
  CLOSED: 'closed',
  OPENED: 'opened',
  FLAGGED: 'flagged',
};

export const GAME_STATUS = {
  IDLE: 'idle',
  PROCESS: 'process',
  WIN: 'win',
  LOSE: 'lose',
};

const NEIGHBOUR_OFFSETS = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1],
];

function createCell() {
  return {
    type: CELL_TYPE.EMPTY,
    state: CELL_STATE.CLOSED,
    minesAround: 0,
  };
}

function cloneBoard(board) {
  return board.map((row) => row.map((cell) => ({ ...cell })));
}

export function createEmptyBoard(rows = ROWS, cols = COLS) {
  return Array.from({ length: rows }, () =>
    Array.from({ length: cols }, createCell),
  );
}

function isInsideBoard(board, row, col) {
  return row >= 0 && row < board.length && col >= 0 && col < board[0].length;
}

function forEachNeighbour(board, row, col, callback) {
  NEIGHBOUR_OFFSETS.forEach(([rowOffset, colOffset]) => {
    const neighbourRow = row + rowOffset;
    const neighbourCol = col + colOffset;

    if (isInsideBoard(board, neighbourRow, neighbourCol)) {
      callback(board[neighbourRow][neighbourCol], neighbourRow, neighbourCol);
    }
  });
}

function plantMines(board, minesCount, safeRow, safeCol) {
  const rows = board.length;
  const cols = board[0].length;
  let planted = 0;

  while (planted < minesCount) {
    const row = Math.floor(Math.random() * rows);
    const col = Math.floor(Math.random() * cols);
    const isSafeCell = row === safeRow && col === safeCol;

    if (board[row][col].type === CELL_TYPE.EMPTY && !isSafeCell) {
      board[row][col].type = CELL_TYPE.MINE;
      planted += 1;
    }
  }
}

function countNeighbourMines(board) {
  board.forEach((row, rowIndex) => {
    row.forEach((cell, colIndex) => {
      if (cell.type === CELL_TYPE.MINE) {
        return;
      }

      let mines = 0;
      forEachNeighbour(board, rowIndex, colIndex, (neighbour) => {
        if (neighbour.type === CELL_TYPE.MINE) {
          mines += 1;
        }
      });

      cell.minesAround = mines;
    });
  });
}

export function generateBoard(safeRow, safeCol, minesCount = MINES_COUNT) {
  const board = createEmptyBoard();

  plantMines(board, minesCount, safeRow, safeCol);
  countNeighbourMines(board);

  return board;
}

export function countFlags(board) {
  return board
    .flat()
    .filter((cell) => cell.state === CELL_STATE.FLAGGED).length;
}

export function isBoardCleared(board) {
  return board
    .flat()
    .every(
      (cell) =>
        cell.type === CELL_TYPE.MINE || cell.state === CELL_STATE.OPENED,
    );
}

function revealMines(board) {
  board.forEach((row) => {
    row.forEach((cell) => {
      if (cell.type === CELL_TYPE.MINE) {
        cell.state = CELL_STATE.OPENED;
      }
    });
  });
}

function revealFrom(board, row, col) {
  const cell = board[row][col];

  if (cell.state !== CELL_STATE.CLOSED) {
    return;
  }

  cell.state = CELL_STATE.OPENED;

  if (cell.minesAround > 0) {
    return;
  }

  forEachNeighbour(board, row, col, (neighbour, neighbourRow, neighbourCol) => {
    if (neighbour.state === CELL_STATE.CLOSED) {
      revealFrom(board, neighbourRow, neighbourCol);
    }
  });
}

export function openCell(board, row, col) {
  const cell = board[row][col];

  if (cell.state !== CELL_STATE.CLOSED) {
    return { board, status: GAME_STATUS.PROCESS, explodedCell: null };
  }

  const nextBoard = cloneBoard(board);

  if (cell.type === CELL_TYPE.MINE) {
    revealMines(nextBoard);

    return {
      board: nextBoard,
      status: GAME_STATUS.LOSE,
      explodedCell: { row, col },
    };
  }

  revealFrom(nextBoard, row, col);

  return {
    board: nextBoard,
    status: isBoardCleared(nextBoard) ? GAME_STATUS.WIN : GAME_STATUS.PROCESS,
    explodedCell: null,
  };
}

export function toggleFlag(board, row, col) {
  const cell = board[row][col];

  if (cell.state === CELL_STATE.OPENED) {
    return board;
  }

  const nextBoard = cloneBoard(board);

  nextBoard[row][col].state =
    cell.state === CELL_STATE.FLAGGED
      ? CELL_STATE.CLOSED
      : CELL_STATE.FLAGGED;

  return nextBoard;
}

export function formatTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}
