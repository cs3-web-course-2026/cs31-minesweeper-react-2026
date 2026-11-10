import { GAME_STATUS } from './game';

export const CELL_VIEW = {
  CLOSED: 'closed',
  OPEN: 'open',
  FLAGGED: 'flagged',
  FLAGGED_CORRECTLY: 'flaggedCorrectly',
  MINE: 'mine',
  MINE_CLICKED: 'mineClicked',
};

export const CELL_SYMBOL = {
  FLAG: '🚩',
  MINE: '💣',
};

export const FLAG_MODE_TEXT = {
  ACTIVE: 'Режим прапорця: увімкнено',
  INACTIVE: 'Режим прапорця: вимкнено',
};

export const STATUS_FACE = {
  [GAME_STATUS.IDLE]: '🙂',
  [GAME_STATUS.PLAYING]: '🙂',
  [GAME_STATUS.WON]: '😎',
  [GAME_STATUS.LOST]: '😵',
};

export const STATUS_MESSAGE = {
  [GAME_STATUS.IDLE]:
    'Відкрийте будь-яку клітинку — перший хід завжди безпечний. Прапорець ставиться правою кнопкою миші або в режимі прапорця.',
  [GAME_STATUS.PLAYING]: '',
  [GAME_STATUS.WON]: '🎉 Перемога! Всі безпечні клітинки відкрито.',
  [GAME_STATUS.LOST]: '💥 Ви підірвалися на міні. Спробуйте ще раз!',
};
