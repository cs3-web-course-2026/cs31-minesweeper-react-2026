import Cell from './Cell';

import styles from './Board.module.css';

function Board({ board, explodedCell, onReveal, onFlag }) {
  return (
    <div
      className={styles.board}
      style={{ '--ka-columns': board[0].length }}
      role="group"
      aria-label="Ігрове поле Minesweeper"
    >
      {board.map((boardRow, row) =>
        boardRow.map((cell, col) => (
          <Cell
            key={`${row}-${col}`}
            cell={cell}
            row={row}
            col={col}
            isExploded={
              explodedCell?.row === row && explodedCell?.col === col
            }
            onReveal={onReveal}
            onFlag={onFlag}
          />
        )),
      )}
    </div>
  );
}

export default Board;
