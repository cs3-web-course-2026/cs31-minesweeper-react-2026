import { useRef, useState } from 'react';

import { KEYBOARD_DIRECTIONS } from '../constants/game';
import CellButton from './CellButton';

import styles from './Board.module.css';

export default function Board({
  board,
  status,
  isFinished,
  flagMode,
  onReveal,
  onFlag,
}) {
  const [activePosition, setActivePosition] = useState({ row: 0, col: 0 });
  const cellRefs = useRef([]);
  const rows = board.length;
  const cols = board[0].length;

  function handleCellFocus(row, col) {
    setActivePosition((previous) => {
      if (previous.row === row && previous.col === col) {
        return previous;
      }

      return { row, col };
    });
  }

  function handleCellKeyDown(event, row, col) {
    if (event.ctrlKey || event.metaKey || event.altKey || event.isComposing) {
      return;
    }

    const direction = KEYBOARD_DIRECTIONS[event.key];

    if (direction) {
      event.preventDefault();
      const nextRow = Math.max(0, Math.min(rows - 1, row + direction[0]));
      const nextCol = Math.max(0, Math.min(cols - 1, col + direction[1]));
      cellRefs.current[nextRow * cols + nextCol]?.focus();

      return;
    }

    if (event.code === 'KeyF') {
      event.preventDefault();

      if (!event.repeat) {
        onFlag(row, col);
      }
    }
  }

  return (
    <div
      className={styles.board}
      role="grid"
      tabIndex={-1}
      aria-label="Ігрове поле Сапера"
      aria-rowcount={rows}
      aria-colcount={cols}
      style={{ '--board-columns': cols }}
      onContextMenu={(event) => event.preventDefault()}
    >
      {board.map((cells, row) => (
        <div
          className={styles.row}
          role="row"
          aria-rowindex={row + 1}
          key={row}
        >
          {cells.map((cell, col) => (
            <div
              className={styles.gridCell}
              role="gridcell"
              aria-colindex={col + 1}
              key={`${row}-${col}`}
            >
              <CellButton
                cell={cell}
                row={row}
                col={col}
                status={status}
                isFinished={isFinished}
                tabIndex={
                  activePosition.row === row && activePosition.col === col
                    ? 0
                    : -1
                }
                buttonRef={(element) => {
                  cellRefs.current[row * cols + col] = element;
                }}
                onReveal={flagMode ? onFlag : onReveal}
                onFlag={onFlag}
                onCellFocus={handleCellFocus}
                onCellKeyDown={handleCellKeyDown}
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
