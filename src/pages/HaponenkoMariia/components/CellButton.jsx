import React from 'react';
import styles from './CellButton.module.css';
import { CELL_STATE, CELL_TYPE, GAME_STATUS } from '../constants/game';

export default function CellButton({
  cellData,
  row: rowIndex,
  col: colIndex,
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
      className += ` ${styles.cellSafe}`;
    }
  } else if (state === CELL_STATE.FLAGGED) {
    if (gameStatus === GAME_STATUS.LOSE && type !== CELL_TYPE.MINE) {
      className += ` ${styles.cellFlaggedWrong}`;
    } else {
      className += ` ${styles.cellFlagged}`;
    }
  }

  // Динамічний розрахунок accessible name (1-based координати + поточний стан)
  let ariaLabel = `Cell ${rowIndex + 1}, ${colIndex + 1} closed`;
  if (state === CELL_STATE.OPENED) {
    if (type === CELL_TYPE.MINE) {
      ariaLabel = `Cell ${rowIndex + 1}, ${colIndex + 1} mine`;
    } else if (neighborMines > 0) {
      ariaLabel = `Cell ${rowIndex + 1}, ${colIndex + 1} with ${neighborMines} neighboring mines`;
    } else {
      ariaLabel = `Cell ${rowIndex + 1}, ${colIndex + 1} empty opened`;
    }
  } else if (state === CELL_STATE.FLAGGED) {
    ariaLabel = `Cell ${rowIndex + 1}, ${colIndex + 1} flagged`;
  }

  return (
    <button
      type="button"
      className={className}
      onClick={() => onClick(rowIndex, colIndex)}
      onContextMenu={(event) => {
        event.preventDefault();
        onContextMenu(rowIndex, colIndex);
      }}
      aria-label={ariaLabel}
    >
      {state === CELL_STATE.OPENED &&
      type === CELL_TYPE.EMPTY &&
      neighborMines > 0
        ? neighborMines
        : ''}
    </button>
  );
}
