import { CELL_STATE } from '../../gameLogic';
import styles from './Cell.module.css';

// Перетворює дані клітинки на вигляд (класи, текст, опис для скрінрідерів)
function getCellView(cell, isGameOver) {
  if (cell.state === CELL_STATE.OPENED) {
    if (cell.isMine) {
      return { classes: [styles.mine, styles.exploded], text: '☠', description: 'підірвана міна' };
    }
    const count = cell.neighborMines;
    if (count === 0) {
      return { classes: [styles.opened], text: '', description: 'порожня' };
    }
    return {
      classes: [styles.opened, styles[`num${count}`]],
      text: count,
      description: `відкрита, мін поруч: ${count}`,
    };
  }

  if (cell.state === CELL_STATE.FLAGGED) {
    const classes = [styles.flagged];
    let description = 'прапорець';
    if (isGameOver) {
      classes.push(cell.isMine ? styles.correct : styles.wrong);
      description = cell.isMine ? 'прапорець, міну знайдено' : 'прапорець помилковий';
    }
    return { classes, text: '⚑', description };
  }

  if (isGameOver && cell.isMine) {
    return { classes: [styles.mine], text: '✹', description: 'міна' };
  }
  return { classes: [styles.closed], text: '', description: 'закрита' };
}

function Cell({ cell, row, col, isGameOver, onOpen, onFlag }) {
  const { classes, text, description } = getCellView(cell, isGameOver);

  const handleContextMenu = (event) => {
    event.preventDefault(); // блокуємо контекстне меню браузера
    onFlag(row, col);
  };

  // прапорець з клавіатури: клавіша F (за фізичним кодом — працює в будь-якій розкладці)
  const handleKeyDown = (event) => {
    if (event.code !== 'KeyF' || event.repeat) return;
    onFlag(row, col);
  };

  return (
    <button
      type="button"
      className={[styles.cell, ...classes].join(' ')}
      aria-label={`Рядок ${row + 1}, стовпець ${col + 1}: ${description}`}
      onClick={() => onOpen(row, col)}
      onContextMenu={handleContextMenu}
      onKeyDown={handleKeyDown}
    >
      {text}
    </button>
  );
}

export default Cell;
