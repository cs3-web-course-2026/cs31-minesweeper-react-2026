import Cell from '../Cell/Cell';
import styles from './Board.module.css';

export default function Board({ board, onReveal, onFlag }) {
  const cols = board[0].length;

  return (
    <div
      className={styles.board}
      style={{ '--cols': cols }}
      onContextMenu={(event) => event.preventDefault()}
    >
      {board.map((line, row) =>
        line.map((cell, col) => (
          <Cell
            key={`${row}-${col}`}
            cell={cell}
            row={row}
            col={col}
            onReveal={() => onReveal(row, col)}
            onFlag={() => onFlag(row, col)}
          />
        )),
      )}
    </div>
  );
}