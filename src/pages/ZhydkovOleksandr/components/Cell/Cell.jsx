import { CELL_LABEL, CELL_STATE, CELL_TYPE, GAME_STATUS, TAB_INDEX } from '../../constants';
import styles from './Cell.module.css';

function getCellView(cell, status) {
  const isGameOver = status !== GAME_STATUS.PROCESS;
  const isOpened = cell.state === CELL_STATE.OPENED;
  const classNames = [styles.cell, styles[cell.state]];
  let text = '';
  let label = CELL_LABEL.CLOSED;

  if (cell.state === CELL_STATE.FLAGGED) {
    label = CELL_LABEL.FLAGGED;
    if (isGameOver && cell.type === CELL_TYPE.MINE) classNames.push(styles.mine);
    if (status === GAME_STATUS.LOSE && cell.type === CELL_TYPE.EMPTY) {
      classNames.push(styles.wrongFlag);
    }
  } else if (isOpened && cell.type === CELL_TYPE.MINE) {
    label = CELL_LABEL.MINE;
    classNames.push(styles.mine);
    if (cell.exploded) classNames.push(styles.exploded);
  } else if (isOpened && cell.neighborMines > 0) {
    label = `Мін поруч: ${cell.neighborMines}`;
    text = cell.neighborMines;
    classNames.push(styles[`n${cell.neighborMines}`]);
  } else if (isOpened) {
    label = CELL_LABEL.EMPTY;
  }

  return {
    className: classNames.join(' '),
    text,
    label,
    isInteractive: !isGameOver && !isOpened,
  };
}

export default function Cell({ cell, status, onOpen, onToggleFlag }) {
  const { className, text, label, isInteractive } = getCellView(cell, status);

  const handleContextMenu = (event) => {
    event.preventDefault();
    onToggleFlag();
  };

  return (
    <button
      type="button"
      className={className}
      aria-label={label}
      aria-disabled={!isInteractive}
      tabIndex={isInteractive ? TAB_INDEX.FOCUSABLE : TAB_INDEX.SKIPPED}
      onClick={onOpen}
      onContextMenu={handleContextMenu}
    >
      {text}
    </button>
  );
}
