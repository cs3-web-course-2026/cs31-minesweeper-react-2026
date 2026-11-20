import styles from './CellButton.module.css';
import { CELL_STATE, GAME_STATUS } from '../constants/game';

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

  if (cell.state === CELL_STATE.FLAGGED) {
    content = '🚩';
    cellDescription = 'flagged';
  } else if (cell.state === CELL_STATE.OPENED) {
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
        cell.state === CELL_STATE.OPENED ? styles.opened : ''
      } ${isExploded ? styles.exploded : ''}`}
      data-count={
        cell.state === CELL_STATE.OPENED && !cell.isMine
          ? cell.neighborMines
          : undefined
      }
      onClick={() => onOpen(row, col)}
      onContextMenu={(event) => {
        event.preventDefault();
        onFlag(row, col);
      }}
      disabled={status !== GAME_STATUS.PLAYING}
      aria-label={ariaLabel}
    >
      {content}
    </button>
  );
}
