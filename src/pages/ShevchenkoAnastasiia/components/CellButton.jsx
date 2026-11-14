import { memo } from 'react';

import { CELL_VIEW } from '../constants/ui';
import { isGameOver } from '../utils/checks';
import { getCellView } from '../utils/cellView';

import styles from './CellButton.module.css';

const VIEW_CLASS = {
  [CELL_VIEW.CLOSED]: styles.closed,
  [CELL_VIEW.OPEN]: styles.open,
  [CELL_VIEW.FLAGGED]: styles.flagged,
  [CELL_VIEW.FLAGGED_CORRECTLY]: `${styles.flagged} ${styles.flaggedCorrectly}`,
  [CELL_VIEW.MINE]: styles.mine,
  [CELL_VIEW.MINE_CLICKED]: styles.mineClicked,
};

function CellButton({ cell, row, col, status, onSelect, onFlag }) {
  const { view, symbol, description } = getCellView(cell, status);
  const numberClass =
    view === CELL_VIEW.OPEN && symbol ? styles[`number${symbol}`] : '';
  const className = [styles.cell, VIEW_CLASS[view], numberClass]
    .filter(Boolean)
    .join(' ');

  const handleClick = () => onSelect(row, col);

  const handleContextMenu = (event) => {
    event.preventDefault();
    onFlag(row, col);
  };

  return (
    <button
      type="button"
      className={className}
      aria-label={`Рядок ${row + 1}, стовпець ${col + 1}, ${description}`}
      disabled={view === CELL_VIEW.OPEN || isGameOver(status)}
      onClick={handleClick}
      onContextMenu={handleContextMenu}
    >
      {symbol}
    </button>
  );
}

export default memo(CellButton);
