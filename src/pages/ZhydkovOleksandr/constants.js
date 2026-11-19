export const SETTINGS = { rows: 9, cols: 9, minesCount: 10 };

export const MAX_COUNTER_VALUE = 999;
export const COUNTER_DIGITS = 3;
export const TIMER_INTERVAL_MS = 1000;
export const INITIAL_GAME_TIME = 0;

export const GAME_STATUS = { PROCESS: 'process', WIN: 'win', LOSE: 'lose' };
export const CELL_STATE = {
  CLOSED: 'closed',
  OPENED: 'opened',
  FLAGGED: 'flagged',
};
export const CELL_TYPE = { EMPTY: 'empty', MINE: 'mine' };

export const CELL_LABEL = {
  CLOSED: 'Закрита клітинка',
  FLAGGED: 'Прапорець',
  MINE: 'Міна',
  EMPTY: 'Порожня клітинка',
};

export const TAB_INDEX = { FOCUSABLE: 0, SKIPPED: -1 };

export const SMILEYS = {
  [GAME_STATUS.PROCESS]: '🙂',
  [GAME_STATUS.WIN]: '😎',
  [GAME_STATUS.LOSE]: '😵',
};

export const NEIGHBOR_OFFSETS = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1],
];
