import { CELL_STATE } from '../../constants';
import flagImage from '../../assets/flag.png';
import mineHitImage from '../../assets/mine-hit.png';
import mineImage from '../../assets/mine.png';
import styles from './Cell.module.css';

function getCellLabel(cell) {
  if (cell.state === CELL_STATE.FLAGGED) {
    return 'Cell marked with a flag';
  }

  if (cell.state === CELL_STATE.CLOSED) {
    return 'Closed cell';
  }

  if (cell.type === 'mine') {
    return 'Mine';
  }

  return cell.neighborMines > 0
    ? `Opened cell: ${cell.neighborMines}`
    : 'Opened empty cell';
}

function getCellContent(cell) {
  if (cell.state !== CELL_STATE.OPENED) {
    return '';
  }

  if (cell.type === 'mine') {
    return '';
  }

  return cell.neighborMines > 0 ? cell.neighborMines : '';
}

function Cell({ cell, col, disabled, isExploded, onOpen, onToggleFlag, row }) {
  const isOpened = cell.state === CELL_STATE.OPENED;
  const isFlagged = cell.state === CELL_STATE.FLAGGED;
  const classNames = [styles.cell];

  if (isOpened) {
    classNames.push(styles.opened);
  } else {
    classNames.push(styles.closed);
  }

  if (isFlagged) {
    classNames.push(styles.flagged);
  }

  if (isOpened && cell.type === 'mine') {
    classNames.push(styles.mine);
  }

  if (isExploded) {
    classNames.push(styles.exploded);
  }

  if (isOpened && cell.neighborMines > 0) {
    classNames.push(styles[`number${cell.neighborMines}`]);
  }

  const content = getCellContent(cell);
  const imageStyles = {
    '--flag-image': `url(${flagImage})`,
    '--mine-hit-image': `url(${mineHitImage})`,
    '--mine-image': `url(${mineImage})`,
  };

  return (
    <button
      type="button"
      className={classNames.join(' ')}
      disabled={disabled}
      aria-label={getCellLabel(cell)}
      role="gridcell"
      data-row={row}
      data-col={col}
      style={imageStyles}
      onClick={onOpen}
      onContextMenu={(event) => {
        event.preventDefault();
        onToggleFlag();
      }}
    >
      {content}
    </button>
  );
}

export default Cell;
