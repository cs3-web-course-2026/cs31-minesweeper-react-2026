export const CELL_TYPE = { EMPTY: 'empty', MINE: 'mine' };
export const CELL_STATE = {
  CLOSED: 'closed',
  OPENED: 'opened',
  FLAGGED: 'flagged',
};
export const GAME_STATUS = {
  IDLE: 'idle',
  PLAYING: 'playing',
  WON: 'won',
  LOST: 'lost',
};
export const GAME_ACTION = {
  REVEAL: 'reveal',
  FLAG: 'flag',
  TICK: 'tick',
  RESTART: 'restart',
  TOGGLE_FLAG_MODE: 'toggleFlagMode',
};
export const GAME_CONFIG = { rows: 10, cols: 10, minesCount: 15 };
export const MILLISECONDS_PER_SECOND = 1000;
export const TIMER_INTERVAL_MS = MILLISECONDS_PER_SECOND;
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
export const KEYBOARD_DIRECTIONS = {
  ArrowUp: [-1, 0],
  ArrowDown: [1, 0],
  ArrowLeft: [0, -1],
  ArrowRight: [0, 1],
};
export const STATUS_MESSAGES = {
  [GAME_STATUS.IDLE]: 'Відкрийте клітинку, щоб почати гру. Щасти!',
  [GAME_STATUS.PLAYING]: 'Відкрийте всі безпечні клітинки. Обережно, міни!',
  [GAME_STATUS.WON]: 'Перемога! Усі безпечні клітинки відкрито.',
  [GAME_STATUS.LOST]:
    'Ви натрапили на міну. Натисніть «Рестарт» і спробуйте ще раз.',
};
export const STATUS_ICONS = {
  [GAME_STATUS.IDLE]: '🙂',
  [GAME_STATUS.PLAYING]: '🙂',
  [GAME_STATUS.WON]: '😎',
  [GAME_STATUS.LOST]: '😵',
};
