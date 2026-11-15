import React from 'react';
import styles from './CellButton.module.css';
import { CELL_STATE, CELL_TYPE, GAME_STATUS } from '../constants/game';

export default function CellButton({
  cellData,
  row,
  col,
  gameStatus,
  onClick,
  onContextMenu,
}) {
  const { type, state, neighborMines, exploded } = cellData;

  let className = styles.cell;

  if (state === CELL_STATE.CLOSED) {
    className += ` ${styles.cellClosed}`;
  } else if (state === CELL_STATE.OPENED) {
    className += ` ${styles.cellOpened}`;
    if (type === CELL_TYPE.MINE) {
      className += ` ${exploded ? styles.cellMineExploded : styles.cellMine}`;
    } else if (neighborMines > 0) {
      className += ` ${styles['val' + neighborMines]}`;
    } else {
      className += ` ${styles.cellSafe}`; // <-- Додано для порожніх відкритих клітинок із мавпочками
    }
  } else if (state === CELL_STATE.FLAGGED) {
    if (gameStatus === GAME_STATUS.LOSE && type !== CELL_TYPE.MINE) {
      className += ` ${styles.cellFlaggedWrong}`;
    } else {
      className += ` ${styles.cellFlagged}`;
    }
  }

  return (
    <button
      type="button"
      className={className}
      onClick={() => onClick(row, col)}
      onContextMenu={(e) => {
        e.preventDefault();
        onContextMenu(row, col);
      }}
      aria-label={`Cell ${row} ${col}`}
    >
      {state === CELL_STATE.OPENED &&
      type === CELL_TYPE.EMPTY &&
      neighborMines > 0
        ? neighborMines
        : ''}
    </button>
  );
}
