import { CELL_STATE, CELL_TYPE, GAME_STATUS } from '../constants';
import { joinClasses } from '../utils/joinClasses';
import styles from './Cell.module.css';

/**
 * Визначає класи, вміст і опис клітинки для скрінрідера.
 * @param {import('../logic/field').Cell} cell Дані клітинки.
 * @param {string} status Поточний статус гри.
 * @returns {{className: string, content: string, description: string}} Вигляд клітинки.
 */
function getCellView(cell, status) {
  const isLost = status === GAME_STATUS.LOSE;
  const isMine = cell.type === CELL_TYPE.MINE;
  const isOpened = cell.state === CELL_STATE.OPENED;

  if (cell.state === CELL_STATE.FLAGGED) {
    const lostFlagClass = isMine ? styles.flagOnMine : styles.flagWithoutMine;
    const lostDescription = isMine ? 'прапорець на міні' : 'помилковий прапорець';

    return {
      className: joinClasses(styles.closed, styles.flag, isLost && lostFlagClass),
      content: '🚩',
      description: isLost ? lostDescription : 'прапорець',
    };
  }

  if (isLost && isMine) {

    return {
      className: isOpened ? styles.mineHit : styles.mine,
      content: '💣',
      description: isOpened ? 'міна вибухнула' : 'міна',
    };
  }

  if (isOpened) {
    const hasNumber = cell.neighborMines > 0;

    return {
      className: joinClasses(styles.opened, hasNumber && styles[`number${cell.neighborMines}`]),
      content: hasNumber ? String(cell.neighborMines) : '',
      description: `відкрита, поруч мін: ${cell.neighborMines}`,
    };
  }

  return { className: styles.closed, content: '', description: 'закрита' };
}

/**
 * Одна клітинка поля: лівий клік відкриває, правий клік або F ставить прапорець.
 * @param {Object} props Властивості компонента.
 * @param {import('../logic/field').Cell} props.cell Дані клітинки.
 * @param {number} props.row Рядок клітинки.
 * @param {number} props.col Стовпець клітинки.
 * @param {string} props.status Поточний статус гри.
 * @param {Function} props.onOpen Обробник відкриття.
 * @param {Function} props.onFlag Обробник прапорця.
 * @returns {JSX.Element} Кнопка клітинки.
 */
function Cell({ cell, row, col, status, onOpen, onFlag }) {
  const { className, content, description } = getCellView(cell, status);
  const isDisabled = status !== GAME_STATUS.PROCESS || cell.state === CELL_STATE.OPENED;

  const handleContextMenu = event => {
    event.preventDefault();
    onFlag(row, col);
  };

  // event.code не залежить від розкладки, тому F працює і в українській.
  const handleKeyDown = event => {
    if (event.code === 'KeyF' && !event.repeat) {
      event.preventDefault();
      onFlag(row, col);
    }
  };

  return (
    <button
      type="button"
      className={joinClasses(styles.cell, className)}
      aria-label={`Рядок ${row + 1}, стовпець ${col + 1}: ${description}`}
      aria-disabled={isDisabled}
      onClick={() => onOpen(row, col)}
      onContextMenu={handleContextMenu}
      onKeyDown={handleKeyDown}
    >
      {content}
    </button>
  );
}

export default Cell;
