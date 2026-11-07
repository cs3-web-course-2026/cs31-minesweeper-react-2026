import styles from './Cell.module.css';

function getContent({ isRevealed, isFlagged, isMine, neighborMines }) {
  if (isFlagged) return '🚩';
  if (!isRevealed) return '';
  if (isMine) return '💣';
  return neighborMines > 0 ? neighborMines : '';
}

function getStateLabel({ isRevealed, isFlagged, isMine, neighborMines }) {
  if (isFlagged) return 'прапорець';
  if (!isRevealed) return 'закрита';
  if (isMine) return 'міна';
  return neighborMines > 0 ? `мін поруч: ${neighborMines}` : 'порожня';
}

export default function Cell({ cell, row, col, onReveal, onFlag }) {
  const className = [
    styles.cell,
    cell.isRevealed ? styles.revealed : styles.hidden,
    cell.isExploded ? styles.exploded : '',
    cell.isRevealed && !cell.isMine ? styles[`n${cell.neighborMines}`] : '',
  ].join(' ');

  const handleContextMenu = (event) => {
    event.preventDefault();
    onFlag();
  };

  return (
    <button
      type="button"
      className={className}
      aria-label={`Рядок ${row + 1}, стовпець ${col + 1}: ${getStateLabel(cell)}`}
      onClick={onReveal}
      onContextMenu={handleContextMenu}
    >
      {getContent(cell)}
    </button>
  );
}