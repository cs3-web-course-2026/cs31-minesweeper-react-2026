import { CELL_CONTENT, CELL_STATE } from '../constants/game';
import styles from './CellButton.module.css';

function CellButton({
  cell,
  row,
  col,
  onReveal,
  onToggleFlag,
  disabled,
  explodedCell,
}) {
  const isOpen = cell.state === CELL_STATE.OPEN;
  const isFlagged = cell.state === CELL_STATE.FLAGGED;

  const isExploded =
    explodedCell?.row === row && explodedCell?.col === col;

  function handleContextMenu(event) {
    event.preventDefault();

    if (!disabled && !isOpen) {
      onToggleFlag(row, col);
    }
  }

  let content = '';

  if (isFlagged) {
    content = '🚩';
  } else if (isOpen && cell.content === CELL_CONTENT.MINE) {
    content = '💣';
  } else if (isOpen && cell.adjacentMines > 0) {
    content = cell.adjacentMines;
  }

  const className = [
    styles.cell,
    isOpen ? styles.open : '',
    isFlagged ? styles.flagged : '',
    isOpen && cell.content === CELL_CONTENT.MINE ? styles.mine : '',
    isExploded ? styles.explodedMine : '',
    isOpen && cell.adjacentMines > 0
      ? styles[`number${cell.adjacentMines}`]
      : '',
  ]
    .filter(Boolean)
    .join(' ');

  let ariaLabel;

  if (isFlagged) {
    ariaLabel = `Клітинка ${row + 1}, ${col + 1}: прапорець`;
  } else if (isOpen) {
    
  let description;

  if (cell.content === CELL_CONTENT.MINE) {
    description = isExploded
      ? 'міна, на якій завершилася гра'
      : 'міна';
  } else {
    description = cell.adjacentMines || 'порожня';
  }

    ariaLabel = `Клітинка ${row + 1}, ${col + 1}: ${description}`;
  } else {
    ariaLabel = `Клітинка ${row + 1}, ${col + 1}: закрита`;
  }

  return (
    <button
      type="button"
      className={className}
      onClick={() => onReveal(row, col)}
      onContextMenu={handleContextMenu}
      disabled={disabled || isOpen}
      aria-label={ariaLabel}
    >
      {content}
    </button>
  );
}

export default CellButton;