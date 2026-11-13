import styles from './CellButton.module.css';

export default function CellButton({
  cell,
  row,
  col,
  status,
  explodedCell,
  onOpen,
  onFlag,
}) {
  const isExploded = explodedCell?.row === row && explodedCell?.col === col;

  let content = '';
  let cellDescription = 'closed';

  if (cell.state === 'flagged') {
    content = '🚩';
    cellDescription = 'flagged';
  } else if (cell.state === 'opened') {
    cellDescription = 'opened';

    if (cell.isMine) {
      content = '💣';
      cellDescription = 'mine';
    } else if (cell.neighborMines > 0) {
      content = cell.neighborMines;
      cellDescription += `, ${cell.neighborMines} neighboring mines`;
    } else {
      cellDescription += ', empty';
    }
  }

  const ariaLabel = `Cell ${row + 1}, ${col + 1}: ${cellDescription}`;

  return (
    <button
      type="button"
      className={`${styles.cell} ${
        cell.state === 'opened' ? styles.opened : ''
      } ${isExploded ? styles.exploded : ''}`}
      data-count={
        cell.state === 'opened' && !cell.isMine ? cell.neighborMines : undefined
      }
      onClick={() => onOpen(row, col)}
      onContextMenu={(event) => {
        event.preventDefault();
        onFlag(row, col);
      }}
      disabled={status !== 'playing'}
      aria-label={ariaLabel}
    >
      {content}
    </button>
  );
}
