import { memo } from 'react';

import { CELL_STATE, CELL_CONTENT } from '../constants/game';

import styles from './CellButton.module.css';


function getCellAriaLabel(cell, row, col) {
  if (cell.state === CELL_STATE.FLAGGED) {
    return `Рядок ${row + 1}, колонка ${col + 1}, прапорець`;
  }

  if (cell.state === CELL_STATE.CLOSED) {
    return `Рядок ${row + 1}, колонка ${col + 1}, закрита`;
  }

  if (cell.content === CELL_CONTENT.MINE) {
    return cell.isExploded
      ? `Рядок ${row + 1}, колонка ${col + 1}, підірвана міна`
      : `Рядок ${row + 1}, колонка ${col + 1}, міна`;
  }

  if (cell.adjacentMines > 0) {
    return `Рядок ${row + 1}, колонка ${col + 1}, відкрито, мін поруч: ${cell.adjacentMines}`;
  }

  return `Рядок ${row + 1}, колонка ${col + 1}, відкрито, порожня`;
}


function getCellContent(cell) {
  if (cell.state === CELL_STATE.FLAGGED) {
    return '🚩';
  }

  if (cell.state === CELL_STATE.OPEN) {
    if (cell.content === CELL_CONTENT.MINE) {
      return cell.isExploded ? '💥' : '💣';
    }

    if (cell.adjacentMines > 0) {
      return String(cell.adjacentMines);
    }
  }

  return null;
}


function CellButton({ cell, row, col, onReveal, onFlag }) {
  const handleClick = () => {
    onReveal(row, col);
  };

  const handleContextMenu = (event) => {
    event.preventDefault();
    onFlag(row, col);
  };

  const classNames = [styles.cell];

  if (cell.state === CELL_STATE.CLOSED) {
    classNames.push(styles.cellClosed);
  } else if (cell.state === CELL_STATE.FLAGGED) {
    classNames.push(styles.cellFlagged);
  } else if (cell.state === CELL_STATE.OPEN) {
    classNames.push(styles.cellOpened);

    if (cell.content === CELL_CONTENT.MINE) {
      classNames.push(cell.isExploded ? styles.cellMineExploded : styles.cellMine);
    } else if (cell.adjacentMines > 0) {
      classNames.push(styles[`number${cell.adjacentMines}`]);
    }
  }

  return (
    <button
      type="button"
      className={classNames.filter(Boolean).join(' ')}
      aria-label={getCellAriaLabel(cell, row, col)}
      data-row={row}
      data-col={col}
      onClick={handleClick}
      onContextMenu={handleContextMenu}
    >
      {getCellContent(cell)}
    </button>
  );
}


export default memo(CellButton);
