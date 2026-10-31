export const BOARD_CONFIG = {
  ROWS: 9,
  COLS: 9,
  MINE_COUNT: 10,
};

export const CELL_TYPE = {
  EMPTY: 'empty',
  MINE: 'mine',
};

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

export const TIMER_CONFIG = {
  INTERVAL_MS: 1000,
  DISPLAY_DIGITS: 3,
};
