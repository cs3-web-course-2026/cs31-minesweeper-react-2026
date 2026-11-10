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
  SET_ELAPSED: 'SET_ELAPSED',
  RESTART: 'RESTART',
  CHANGE_DIFFICULTY: 'CHANGE_DIFFICULTY',
};

export const DIFFICULTY = {
  EASY: 'easy',
  MEDIUM: 'medium',
  HARD: 'hard',
};

export const DIFFICULTY_CONFIG = {
  [DIFFICULTY.EASY]: {
    label: 'Легкий',
    rows: 10,
    cols: 10,
    minesCount: 15,
  },
  [DIFFICULTY.MEDIUM]: {
    label: 'Середній',
    rows: 14,
    cols: 14,
    minesCount: 35,
  },
  [DIFFICULTY.HARD]: {
    label: 'Складний',
    rows: 16,
    cols: 24,
    minesCount: 65,
  },
};

export const DEFAULT_DIFFICULTY = DIFFICULTY.EASY;

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

export const MS_PER_SECOND = 1000;
export const TIMER_POLL_INTERVAL_MS = 250;
export const MAX_TIMER_SECONDS = 999;
export const COUNTER_DIGITS = 3;
export const BEST_TIMES_STORAGE_KEY =
  'shevchenko-anastasiia-minesweeper-best-times';
