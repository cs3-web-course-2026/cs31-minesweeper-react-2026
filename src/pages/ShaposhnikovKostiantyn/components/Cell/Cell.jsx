import styles from './Cell.module.css';

function getContent({ isRevealed, isFlagged, isMine, neighborMines }) {
  if (isFlagged) return '🚩';
  if (!isRevealed) return '';
  if (isMine) return '💣';
  return neighborMines > 0 ? neighborMines : '';
}

export default function Cell({ cell, onReveal, onFlag }) {
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
      onClick={onReveal}
      onContextMenu={handleContextMenu}
    >
      {getContent(cell)}
    </button>
  );
}
