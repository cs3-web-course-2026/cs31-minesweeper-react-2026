import { memo } from 'react';

import {
  CELL_STATE,
  CELL_TYPE,
  GAME_STATUS,
} from '../constants/game';
import { getCellAriaLabel } from '../utils/format';

import styles from './CellButton.module.css';


function CellButton({ cell, row, col, status, onOpen, onFlag }) {
  const handleCellClick = () => {
    onOpen(row, col);
  };

  const handleCellContextMenu = (event) => {
    event.preventDefault();
    onFlag(row, col);
  };

  const classNames = [styles.cell];
  let content = '';

  if (cell.state === CELL_STATE.CLOSED) {
    classNames.push(styles.cellClosed);
  } else if (cell.state === CELL_STATE.FLAGGED) {
    const isEndGameMine =
      status !== GAME_STATUS.PROCESS && cell.type === CELL_TYPE.MINE;

    classNames.push(
      isEndGameMine ? styles.cellFlaggedMine : styles.cellFlagged,
    );
  } else if (cell.state === CELL_STATE.OPENED) {
    if (cell.type === CELL_TYPE.MINE) {
      classNames.push(
        cell.isExploded ? styles.cellExploded : styles.cellMine,
      );
    } else {
      classNames.push(styles.cellOpened);

      if (cell.neighborMines > 0) {
        classNames.push(styles[`cellNumber${cell.neighborMines}`]);
        content = String(cell.neighborMines);
      }
    }
  }

  return (
    <button
      type="button"
      className={classNames.filter(Boolean).join(' ')}
      aria-label={getCellAriaLabel(cell, row, col, status)}
      data-row={row}
      data-col={col}
      onClick={handleCellClick}
      onContextMenu={handleCellContextMenu}
    >
      {content}
    </button>
  );
}


export default memo(CellButton);
