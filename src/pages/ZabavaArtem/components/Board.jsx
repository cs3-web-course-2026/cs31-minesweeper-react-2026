import Cell from './Cell.jsx';
import styles from './Board.module.css';

export default function Board({ board, getCellLabel, onOpenCell, onToggleFlag }) {
  return (
    <section
      className={styles.board}
      aria-label="Minesweeper board"
      style={{ '--board-size': board[0]?.length ?? 10 }}
    >
      {board.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <Cell
            key={`${rowIndex}-${colIndex}`}
            cell={cell}
            row={rowIndex}
            col={colIndex}
            label={getCellLabel(cell, rowIndex, colIndex)}
            onOpen={onOpenCell}
            onToggleFlag={onToggleFlag}
          />
        )),
      )}
    </section>
  );
}
