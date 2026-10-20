export const CELL_STATE = {
  CLOSED: 'closed',
  OPEN: 'open',
  FLAGGED: 'flagged',
};

export const GAME_STATUS = {
  IDLE: 'idle',
  PLAYING: 'playing',
  WON: 'won',
  LOST: 'lost',
};

export const CELL_CONTENT = {
  MINE: 'mine',
  EMPTY: 'empty',
};

export const DEFAULT_CONFIG = {
  rows: 10,
  cols: 10,
  mineCount: 15,
};

export const DIRECTIONS = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1],
];

export const COUNTER_DIGITS = 3;
