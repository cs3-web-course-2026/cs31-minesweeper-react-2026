import Cell from '../Cell/Cell';
import styles from './Board.module.css';

export default function Board({ board, onReveal, onFlag }) {
  const cols = board[0].length;

  return (
    <div
      className={styles.board}
      style={{ gridTemplateColumns: `repeat(${cols}, 32px)` }}
      onContextMenu={(event) => event.preventDefault()}
    >
      {board.map((line, row) =>
        line.map((cell, col) => (
          <Cell
            // позиція клітинки не змінюється, тому індекси тут допустимі як key
            key={`${row}-${col}`}
            cell={cell}
            onReveal={() => onReveal(row, col)}
            onFlag={() => onFlag(row, col)}
          />
        )),
      )}
    </div>
  );
}
