import CellButton from './CellButton';
import styles from './Board.module.css';

export default function Board({ board, status, explodedCell, onOpen, onFlag }) {
  return (
    <div
      className={styles.board}
      role="group"
      aria-label="Minesweeper game board"
    >
      {board.map((row, rowIndex) => (
        <div
          className={styles.row}
          key={rowIndex}
          role="group"
          aria-label={`Row ${rowIndex + 1}`}
        >
          {row.map((cell, colIndex) => (
            <CellButton
              key={`${rowIndex}-${colIndex}`}
              cell={cell}
              row={rowIndex}
              col={colIndex}
              status={status}
              explodedCell={explodedCell}
              onOpen={onOpen}
              onFlag={onFlag}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
