import { CELL_CONTENT, CELL_STATE } from '../constants/game';
import { getCellLabel, getCellSymbol } from '../utils/cellDisplay';

import styles from './CellButton.module.css';

function getCellClassName(cell, isExploded, isWrongFlag) {
  return [
    styles.cell,
    cell.state === CELL_STATE.CLOSED ? styles.closed : '',
    cell.state === CELL_STATE.OPEN ? styles.open : '',
    cell.state === CELL_STATE.FLAGGED ? styles.flagged : '',
    cell.state === CELL_STATE.OPEN && cell.adjacentMines > 0
      ? styles[`number${cell.adjacentMines}`]
      : '',
    cell.state === CELL_STATE.OPEN && cell.content === CELL_CONTENT.MINE
      ? styles.mine
      : '',
    isExploded ? styles.exploded : '',
    isWrongFlag ? styles.wrongFlag : '',
  ]
    .filter(Boolean)
    .join(' ');
}

function CellButton({
  cell,
  row,
  col,
  isExploded,
  isWrongFlag,
  onReveal,
  onFlag,
}) {
  const handleClick = () => onReveal(row, col);

  const handleContextMenu = (event) => {
    event.preventDefault();
    onFlag(row, col);
  };

  return (
    <button
      type="button"
      className={getCellClassName(cell, isExploded, isWrongFlag)}
      aria-label={getCellLabel(cell, row, col, isExploded, isWrongFlag)}
      onClick={handleClick}
      onContextMenu={handleContextMenu}
    >
      {getCellSymbol(cell)}
    </button>
  );
}

export default CellButton;
