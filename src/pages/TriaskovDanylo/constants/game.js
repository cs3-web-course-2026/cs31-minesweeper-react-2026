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
  PROCESS: 'process',
  WIN: 'win',
  LOSE: 'lose',
};

export const GAME_ACTION = {
  OPEN_CELL: 'openCell',
  TOGGLE_FLAG: 'toggleFlag',
  START_GAME: 'startGame',
  RESTART_GAME: 'restartGame',
};

export const DEFAULT_CONFIG = {
  rows: 10,
  cols: 10,
  minesCount: 15,
};

export const TIMER_INTERVAL_MS = 1000;
export const COUNTER_DIGITS = 3;
export const MAX_DISPLAY_VALUE = 999;

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
