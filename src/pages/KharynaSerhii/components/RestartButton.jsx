import { GAME_STATUS } from '../constants';
import styles from './RestartButton.module.css';

const FACES = {
  [GAME_STATUS.PROCESS]: '🙂',
  [GAME_STATUS.WIN]: '😎',
  [GAME_STATUS.LOSE]: '😵',
};

/**
 * Кнопка нової гри з обличчям, що залежить від статусу.
 * @param {Object} props Властивості компонента.
 * @param {string} props.status Поточний статус гри.
 * @param {Function} props.onRestart Обробник перезапуску.
 * @returns {JSX.Element} Кнопка.
 */
function RestartButton({ status, onRestart }) {

  return (
    <button className={styles.button} type="button" aria-label="Почати нову гру" onClick={onRestart}>
      <span aria-hidden="true">{FACES[status]}</span>
      <span className={styles.text}>Нова гра</span>
    </button>
  );
}

export default RestartButton;
