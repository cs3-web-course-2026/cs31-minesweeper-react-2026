import { CELL_TYPE, CELL_STATE, GAME_STATUS } from '../constants/game';
import styles from './Cell.module.css';

export function Cell({
  cell,
  row,
  col,
  gameStatus,
  isExplodedSource,
  onOpen,
  onToggleFlag,
}) {
  const isGameRunning = gameStatus === GAME_STATUS.PROCESS;
  const isGameOver = gameStatus === GAME_STATUS.LOSE;

  let cellClass = styles.closed;
  let cellContent = '';
  let ariaLabel = `Row ${row + 1}, column ${col + 1}, closed`;

  if (isGameOver) {
    if (isExplodedSource) {
      cellClass = styles.firstExploded;
      cellContent = '💣';
      ariaLabel = `Row ${row + 1}, column ${col + 1}, exploded mine`;
    } else if (cell.type === CELL_TYPE.MINE) {
      if (cell.state === CELL_STATE.FLAGGED) {
        cellClass = styles.flagged;
        cellContent = '🚩';
        ariaLabel = `Row ${row + 1}, column ${col + 1}, flagged mine`;
      } else {
        cellClass = styles.bombed;
        cellContent = '💣';
        ariaLabel = `Row ${row + 1}, column ${col + 1}, mine`;
      }
    } else {
      if (cell.state === CELL_STATE.FLAGGED) {
        cellClass = styles.flaggedWrong;
        cellContent = '🚩';
        ariaLabel = `Row ${row + 1}, column ${col + 1}, wrongly flagged`;
      } else {
        cellClass = styles.opened;
        cellContent = cell.neighborMines || '';
        ariaLabel = `Row ${row + 1}, column ${col + 1}, opened ${cell.neighborMines || 0} mines`;
      }
    }
  } else {
    if (cell.state === CELL_STATE.OPENED) {
      cellClass = styles.opened;
      cellContent = cell.neighborMines || '';
      ariaLabel = `Row ${row + 1}, column ${col + 1}, opened ${cell.neighborMines || 0} mines`;
    } else if (cell.state === CELL_STATE.FLAGGED) {
      cellClass = styles.flagged;
      cellContent = '🚩';
      ariaLabel = `Row ${row + 1}, column ${col + 1}, flagged`;
    }
  }

  const combinedClasses = [
    styles.cell,
    cellClass,
    isGameRunning ? styles.interactive : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      type="button"
      className={combinedClasses}
      aria-label={ariaLabel}
      disabled={!isGameRunning}
      onClick={() => onOpen(row, col)}
      onContextMenu={(event) => {
        event.preventDefault();
        onToggleFlag(row, col);
      }}
    >
      {cellContent}
    </button>
  );
}
