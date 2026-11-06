export const CELL_STATE = {
  CLOSED: 'closed',
  OPEN: 'open',
  FLAGGED: 'flagged',
};

export const CELL_CONTENT = {
  MINE: 'mine',
  EMPTY: 'empty',
};

export const GAME_STATUS = {
  IDLE: 'idle',
  PLAYING: 'playing',
  WON: 'won',
  LOST: 'lost',
};

export const GAME_ACTION = {
  REVEAL_CELL: 'REVEAL_CELL',
  TOGGLE_FLAG: 'TOGGLE_FLAG',
  TICK: 'TICK',
  RESTART: 'RESTART',
};

export const DEFAULT_CONFIG = {
  rows: 10,
  cols: 10,
  mineCount: 15,
};

export const TIMER_INTERVAL_MS = 1000;
export const COUNTER_DIGITS = 3;

export const NEIGHBOUR_DIRECTIONS = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1],
];

export const CELL_SYMBOL = {
  MINE: '💣',
  FLAG: '🚩',
};

export const CELL_LABEL = {
  CLOSED: 'closed',
  FLAGGED: 'flagged',
  WRONG_FLAG: 'wrong flag',
  MINE: 'mine',
  EXPLODED_MINE: 'exploded mine',
  OPEN_NO_MINES: 'open, no mines nearby',
  OPEN_WITH_MINES: 'open, mines nearby',
};

export const GAME_MESSAGE = {
  [GAME_STATUS.IDLE]: 'Click any cell to start.',
  [GAME_STATUS.PLAYING]: '',
  [GAME_STATUS.WON]: 'You won! All safe cells are open.',
  [GAME_STATUS.LOST]: 'Game over! You hit a mine.',
};
