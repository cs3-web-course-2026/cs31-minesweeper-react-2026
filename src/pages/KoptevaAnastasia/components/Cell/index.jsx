import { CELL_STATE, CELL_TYPE } from '../../gameLogic';
import styles from './Cell.module.css';

function getContent(cell) {
  if (cell.state === CELL_STATE.FLAGGED) {
    return '🚩';
  }

  if (cell.state !== CELL_STATE.OPENED) {
    return '';
  }

  if (cell.type === CELL_TYPE.MINE) {
    return '💣';
  }

  return cell.minesAround > 0 ? cell.minesAround : '';
}

function getLabel(cell, row, col) {
  const position = `Клітинка ${row + 1}, ${col + 1}`;

  if (cell.state === CELL_STATE.FLAGGED) {
    return `${position}: прапорець`;
  }

  if (cell.state === CELL_STATE.CLOSED) {
    return `${position}: закрита`;
  }

  if (cell.type === CELL_TYPE.MINE) {
    return `${position}: міна`;
  }

  return cell.minesAround > 0
    ? `${position}: поруч мін — ${cell.minesAround}`
    : `${position}: порожня`;
}

function Cell({ cell, row, col, isExploded, onOpen, onToggleFlag }) {
  const isOpened = cell.state === CELL_STATE.OPENED;
  const isMine = cell.type === CELL_TYPE.MINE;

  const className = [
    styles.cell,
    isOpened ? styles.opened : styles.closed,
    cell.state === CELL_STATE.FLAGGED ? styles.flagged : null,
    isOpened && isMine ? styles.mine : null,
    isExploded ? styles.exploded : null,
    isOpened && !isMine && cell.minesAround > 0
      ? styles[`number${cell.minesAround}`]
      : null,
  ]
    .filter(Boolean)
    .join(' ');

  const handleContextMenu = (event) => {
    event.preventDefault();
    onToggleFlag(row, col);
  };

  return (
    <button
      type="button"
      className={className}
      onClick={() => onOpen(row, col)}
      onContextMenu={handleContextMenu}
      aria-label={getLabel(cell, row, col)}
    >
      {getContent(cell)}
    </button>
  );
}

export default Cell;
