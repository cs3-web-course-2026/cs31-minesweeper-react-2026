export const GAME_CONFIG = {
  ROWS: 10,
  COLS: 10,
  MINES_COUNT: 15,
  MAX_TIME: 999,
};

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

export const CELL_TYPE = {
  EMPTY: 'empty',
  MINE: 'mine',
};
