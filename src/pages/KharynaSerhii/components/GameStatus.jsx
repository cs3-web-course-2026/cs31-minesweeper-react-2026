import { GAME_STATUS } from '../constants';
import { joinClasses } from '../utils/joinClasses';
import styles from './GameStatus.module.css';

const FINAL_MESSAGES = {
  [GAME_STATUS.WIN]: 'Перемога! Усі безпечні клітинки відкриті.',
  [GAME_STATUS.LOSE]: 'Ви натрапили на міну. Спробуйте ще раз!',
};
const MESSAGE_NOT_STARTED = 'Відкрийте клітинку, щоб почати гру.';
const MESSAGE_IN_PROGRESS = 'Знайдіть усі безпечні клітинки. Прапорець: правий клік або F.';

/**
 * Показує повідомлення про перебіг або результат гри.
 * @param {Object} props Властивості компонента.
 * @param {string} props.status Поточний статус гри.
 * @param {boolean} props.isStarted Чи вже відкрито першу клітинку.
 * @returns {JSX.Element} Повідомлення.
 */
function GameStatus({ status, isStarted }) {
  const inProgressMessage = isStarted ? MESSAGE_IN_PROGRESS : MESSAGE_NOT_STARTED;

  return (
    <p className={joinClasses(styles.message, styles[status])} role="status" aria-live="polite">
      {FINAL_MESSAGES[status] ?? inProgressMessage}
    </p>
  );
}

export default GameStatus;
