export const GAME_CONFIG = {
  ROWS: 10,
  COLS: 10,
  MINE_COUNT: 15,
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

export const CELL_CONTENT = {
  MINE: 'mine',
  EMPTY: 'empty',
};

export const GAME_ACTION = {
  RESTART: 'RESTART',
  REVEAL_CELL: 'REVEAL_CELL',
  TOGGLE_FLAG: 'TOGGLE_FLAG',
};