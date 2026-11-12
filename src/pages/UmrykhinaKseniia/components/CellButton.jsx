import { memo } from 'react';

import { CELL_STATE } from '../constants/game';
import styles from './CellButton.module.css';

const FLAG_SYMBOL = '\u{1F6A9}';
const MINE_SYMBOL = '\u{1F4A3}';
const FLAG_KEY = 'f';

function getCellSymbol(cell) {
  if (cell.state === CELL_STATE.FLAGGED) {
    return FLAG_SYMBOL;
  }

  if (cell.state === CELL_STATE.OPEN && cell.hasMine) {
    return MINE_SYMBOL;
  }

  if (cell.state === CELL_STATE.OPEN && cell.adjacentMines > 0) {
    return cell.adjacentMines;
  }

  return '';
}

function getCellDescription(cell) {
  if (cell.state === CELL_STATE.FLAGGED) {
    return 'flagged';
  }

  if (cell.state === CELL_STATE.CLOSED) {
    return 'closed';
  }

  if (cell.hasMine) {
    return 'mine';
  }

  return `open, ${cell.adjacentMines} adjacent mines`;
}

function CellButton({ cell, row, col, onReveal, onFlag }) {
  const isOpen = cell.state === CELL_STATE.OPEN;

  const cellClassName = [
    styles.cell,
    isOpen ? styles.open : styles.closed,
    isOpen && cell.hasMine ? styles.mine : '',
    isOpen && cell.adjacentMines > 0 ? styles[`number${cell.adjacentMines}`] : '',
  ]
    .filter(Boolean)
    .join(' ');

  const handleClick = () => onReveal(row, col);

  const handleContextMenu = (event) => {
    event.preventDefault();
    onFlag(row, col);
  };

  const handleKeyDown = (event) => {
    const isPlainFlagKey =
      event.key.toLowerCase() === FLAG_KEY &&
      !event.repeat &&
      !event.ctrlKey &&
      !event.metaKey &&
      !event.altKey;

    if (!isPlainFlagKey) {
      return;
    }

    event.preventDefault();
    onFlag(row, col);
  };

  return (
    <button
      type="button"
      className={cellClassName}
      aria-label={`Row ${row + 1}, column ${col + 1}, ${getCellDescription(cell)}`}
      onClick={handleClick}
      onContextMenu={handleContextMenu}
      onKeyDown={handleKeyDown}
    >
      {getCellSymbol(cell)}
    </button>
  );
}

export default memo(CellButton);
