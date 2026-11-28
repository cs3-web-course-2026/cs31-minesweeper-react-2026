import { CELL_STATE, CELL_TYPE } from '../../constants/game';
import styles from './Cell.module.css';

function Cell({ cell, onOpen, onToggleFlag }) {
  const { row, col, state, type, neighborMines, isExploded } = cell;

  const handleClick = () => {
    onOpen(row, col);
  };

  const handleContextMenu = (event) => {
    event.preventDefault();
    onToggleFlag(row, col);
  };

  const classNames = [styles.cell];
  let content = '';
  let ariaLabel = `Клітинка ${row + 1}, ${col + 1} закрита`;

  if (state === CELL_STATE.CLOSED) {
    classNames.push(styles.closed);
  } else if (state === CELL_STATE.FLAGGED) {
    classNames.push(styles.closed, styles.flagged);
    content = '🚩';
    ariaLabel = `Прапорець на клітинці ${row + 1}, ${col + 1}`;
  } else if (state === CELL_STATE.OPENED) {
    classNames.push(styles.open);
    if (type === CELL_TYPE.MINE) {
      classNames.push(styles.mine);
      if (isExploded) {
        classNames.push(styles.exploded);
        content = '💥';
      } else {
        content = '💣';
      }
      ariaLabel = 'Міна';
    } else if (neighborMines > 0) {
      classNames.push(styles[`val${neighborMines}`]);
      content = String(neighborMines);
      ariaLabel = `Кількість мін поряд: ${neighborMines}`;
    } else {
      ariaLabel = 'Порожня відкрита клітинка';
    }
  }

  return (
    <button
      type="button"
      className={classNames.join(' ')}
      onClick={handleClick}
      onContextMenu={handleContextMenu}
      aria-label={ariaLabel}
    >
      {content}
    </button>
  );
}

export default Cell;
