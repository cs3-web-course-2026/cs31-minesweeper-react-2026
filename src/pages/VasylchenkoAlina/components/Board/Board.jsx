import Cell from '../Cell/Cell';
import styles from './Board.module.css';

function Board({ board, isGameOver, onOpen, onFlag }) {
  const rows = board.length;
  const cols = board[0].length;

  return (
    <section
      className={styles.board}
      aria-label="Ігрове поле"
      style={{ '--board-rows': rows, '--board-cols': cols }}
    >
      {board.map((cells, row) =>
        cells.map((cell, col) => (
          <Cell
            key={`${row}-${col}`}
            cell={cell}
            row={row}
            col={col}
            isGameOver={isGameOver}
            onOpen={onOpen}
            onFlag={onFlag}
          />
        ))
      )}
    </section>
  );
}

export default Board;
