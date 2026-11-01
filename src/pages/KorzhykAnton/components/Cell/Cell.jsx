import { memo } from 'react';
import { CELL_STATE, CELL_TYPE } from '../../constants';
import styles from './Cell.module.css';

/** Визначає вигляд клітинки за її даними та станом гри */
function getCellView(cell, isLost, isExploded) {
  const isMine = cell.type === CELL_TYPE.MINE;

  if (cell.state === CELL_STATE.FLAGGED) {
    return isLost && !isMine
      ? { classes: [styles.flagged, styles.flagWrong], label: 'Прапорець без міни' }
      : { classes: [styles.flagged], label: 'Прапорець' };
  }

  if (isMine && (cell.state === CELL_STATE.OPENED || isLost)) {
    return {
      classes: [styles.opened, styles.mine, isExploded && styles.exploded],
      label: 'Міна',
    };
  }

  if (cell.state === CELL_STATE.OPENED) {
    const count = cell.neighborMines;
    return {
      classes: [styles.opened],
      count,
      label: count > 0 ? `${count} мін поруч` : 'Порожня клітинка',
    };
  }

  return { classes: [], label: 'Закрита клітинка' };
}

function Cell({ cell, row, col, isLost, isExploded, onOpen, onFlag }) {
  const { classes, count, label } = getCellView(cell, isLost, isExploded);
  const className = [styles.cell, ...classes].filter(Boolean).join(' ');

  const handleClick = () => onOpen(row, col);

  const handleContextMenu = (event) => {
    event.preventDefault();
    onFlag(row, col);
  };

  return (
    <button
      type="button"
      className={className}
      data-count={count || undefined}
      aria-label={label}
      onClick={handleClick}
      onContextMenu={handleContextMenu}
    >
      {count > 0 ? count : null}
    </button>
  );
}

export default memo(Cell);
