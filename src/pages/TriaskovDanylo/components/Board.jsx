import { memo } from 'react';

import CellButton from './CellButton';

import styles from './Board.module.css';


function Board({ board, status, onOpen, onFlag }) {
  return (
    <section
      className={styles.board}
      style={{ '--board-columns': board[0].length }}
      aria-label="Ігрове поле"
    >
      {board.map((rowCells, row) =>
        rowCells.map((cell, col) => (
          <CellButton
            key={`${row}-${col}`}
            cell={cell}
            row={row}
            col={col}
            status={status}
            onOpen={onOpen}
            onFlag={onFlag}
          />
        )),
      )}
    </section>
  );
}


export default memo(Board);
