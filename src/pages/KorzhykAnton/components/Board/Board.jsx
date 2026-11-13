import Cell from '../Cell/Cell';
import styles from './Board.module.css';

export default function Board({ field, isFinished, isLost, explodedCell, onOpen, onFlag }) {
  const cols = field[0].length;

  return (
    <section
      className={`${styles.board} ${isFinished ? styles.finished : ''}`}
      style={{ '--cols': cols }}
      aria-label={`Ігрове поле ${field.length} на ${cols}`}
    >
      {field.map((rowCells, row) =>
        rowCells.map((cell, col) => (
          <Cell
            key={`${row}-${col}`}
            cell={cell}
            row={row}
            col={col}
            isLost={isLost}
            isExploded={explodedCell?.row === row && explodedCell?.col === col}
            onOpen={onOpen}
            onFlag={onFlag}
          />
        ))
      )}
    </section>
  );
}
