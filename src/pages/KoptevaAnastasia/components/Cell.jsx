import { CELL_STATE, CELL_TYPE } from '../constants/game';

import styles from './Cell.module.css';

function getContent(cell) {
  if (cell.state === CELL_STATE.FLAGGED) {
    return '\u{1F6A9}';
  }

  if (cell.state !== CELL_STATE.OPENED) {
    return '';
  }

  if (cell.type === CELL_TYPE.MINE) {
    return '\u{1F4A3}';
  }

  return cell.minesAround > 0 ? cell.minesAround : '';
}

function getLabel(cell, row, col) {
  const position = `Клітинка ${row + 1}, ${col + 1}`;

  if (cell.state === CELL_STATE.FLAGGED) {
    return `${position}: прапорець`;
  }

  if (cell.state === CELL_STATE.CLOSED) {
    return `${position}: закрита`;
  }

  if (cell.type === CELL_TYPE.MINE) {
    return `${position}: міна`;
  }

  return cell.minesAround > 0
    ? `${position}: поруч мін — ${cell.minesAround}`
    : `${position}: порожня`;
}

function Cell({ cell, row, col, isExploded, onReveal, onFlag }) {
  const isOpened = cell.state === CELL_STATE.OPENED;
  const isMine = cell.type === CELL_TYPE.MINE;
  const hasNumber = isOpened && !isMine && cell.minesAround > 0;

  const className = [
    styles.cell,
    isOpened ? styles.opened : styles.closed,
    cell.state === CELL_STATE.FLAGGED ? styles.flagged : null,
    isOpened && isMine ? styles.mine : null,
    isExploded ? styles.exploded : null,
    hasNumber ? styles[`number${cell.minesAround}`] : null,
  ]
    .filter(Boolean)
    .join(' ');

  const handleContextMenu = (event) => {
    event.preventDefault();
    onFlag(row, col);
  };

  const handleKeyDown = (event) => {
    if (event.code === 'KeyF') {
      event.preventDefault();
      onFlag(row, col);
    }
  };

  return (
    <button
      type="button"
      className={className}
      aria-label={getLabel(cell, row, col)}
      onClick={() => onReveal(row, col)}
      onContextMenu={handleContextMenu}
      onKeyDown={handleKeyDown}
    >
      {getContent(cell)}
    </button>
  );
}

export default Cell;
