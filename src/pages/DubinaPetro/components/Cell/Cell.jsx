import { CELL_STATE, CELL_TYPE } from '../../constants';
import flagImage from '../../assets/flag.png';
import mineHitImage from '../../assets/mine-hit.png';
import mineImage from '../../assets/mine.png';
import styles from './Cell.module.css';

function getCellLabel(cell, row, col) {
  const position = `Row ${row + 1}, column ${col + 1}`;

  if (cell.state === CELL_STATE.FLAGGED) {
    return `${position}, cell marked with a flag`;
  }

  if (cell.state === CELL_STATE.CLOSED) {
    return `${position}, closed cell`;
  }

  if (cell.type === CELL_TYPE.MINE) {
    return `${position}, mine`;
  }

  return cell.neighborMines > 0
    ? `${position}, opened cell with ${cell.neighborMines} neighboring mines`
    : `${position}, opened empty cell`;
}

function getCellContent(cell) {
  if (cell.state !== CELL_STATE.OPENED) {
    return '';
  }

  if (cell.type === CELL_TYPE.MINE) {
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

  if (isOpened && cell.type === CELL_TYPE.MINE) {
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
      aria-label={getCellLabel(cell, row, col)}
      role="gridcell"
      aria-rowindex={row + 1}
      aria-colindex={col + 1}
      data-row={row}
      data-col={col}
      style={imageStyles}
      onClick={onOpen}
      onContextMenu={(event) => {
        event.preventDefault();
        onToggleFlag();
      }}
      onKeyDown={(event) => {
        if (event.key.toLowerCase() === 'f') {
          event.preventDefault();
          onToggleFlag();
        }
      }}
    >
      {content}
    </button>
  );
}

export default Cell;
