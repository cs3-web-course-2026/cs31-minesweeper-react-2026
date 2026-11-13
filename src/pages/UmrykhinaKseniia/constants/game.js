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

export const GAME_ACTION = {
  REVEAL_CELL: 'REVEAL_CELL',
  TOGGLE_FLAG: 'TOGGLE_FLAG',
  TICK: 'TICK',
  RESTART: 'RESTART',
};

export const GAME_CONFIG = {
  rows: 9,
  cols: 9,
  mineCount: 10,
};

export const NEIGHBOUR_OFFSETS = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1],
];

export const TIMER_INTERVAL_MS = 1000;
export const MAX_TIMER_SECONDS = 999;