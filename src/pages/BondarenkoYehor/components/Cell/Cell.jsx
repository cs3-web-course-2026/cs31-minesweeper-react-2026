import { memo } from 'react';
import { getCellView } from './cellView';
import styles from './Cell.module.css';

function Cell({ cell, row, col, status, isExploded, onOpen, onFlag }) {
  const { variants, symbol, count, label } = getCellView(cell, { status, isExploded });
  const className = [styles.cell, ...variants.map((variant) => styles[variant])].join(' ');

  const handleContextMenu = (event) => {
    event.preventDefault();
    onFlag(row, col);
  };

  const handleKeyDown = (event) => {
    if (event.key.toLowerCase() === 'f') {
      event.preventDefault();
      onFlag(row, col);
    }
  };

  return (
    <button
      type="button"
      className={className}
      aria-label={`Row ${row + 1}, column ${col + 1}, ${label}`}
      onClick={() => onOpen(row, col)}
      onContextMenu={handleContextMenu}
      onKeyDown={handleKeyDown}
    >
      <span className={styles.cover} />
      <span className={styles.content} data-count={count}>
        {symbol}
      </span>
    </button>
  );
}

export default memo(Cell);
