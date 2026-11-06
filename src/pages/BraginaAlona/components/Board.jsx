import CellButton from './CellButton';
import styles from './Board.module.css';

function Board({ board, onReveal, onToggleFlag, disabled }) {
  return (
    <div
      className={styles.board}
      role="group"
      aria-label="Ігрове поле Сапер, 10 рядків і 10 стовпців"
    >
      {board.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <CellButton
            key={`${rowIndex}-${colIndex}`}
            cell={cell}
            row={rowIndex}
            col={colIndex}
            onReveal={onReveal}
            onToggleFlag={onToggleFlag}
            disabled={disabled}
          />
        )),
      )}
    </div>
  );
}

export default Board;