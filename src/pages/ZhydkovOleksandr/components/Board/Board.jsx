import Cell from '../Cell/Cell';
import styles from './Board.module.css';

export default function Board({ board, cols, status, onOpenCell, onToggleFlag }) {
  return (
    <section className={styles.board} style={{ '--cols': cols }} aria-label="Ігрове поле">
      {board.map((rowCells, row) =>
        rowCells.map((cell, col) => (
          <Cell
            key={`${row}-${col}`}
            cell={cell}
            status={status}
            onOpen={() => onOpenCell(row, col)}
            onToggleFlag={() => onToggleFlag(row, col)}
          />
        ))
      )}
    </section>
  );
}
