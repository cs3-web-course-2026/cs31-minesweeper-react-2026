import Cell from '../Cell';
import styles from './Board.module.css';

function Board({ board, explodedCell, onOpen, onToggleFlag }) {
  return (
    <div
      className={styles.board}
      style={{ '--ka-columns': board[0].length }}
      role="group"
      aria-label="Ігрове поле Minesweeper"
    >
      {board.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <Cell
            key={`${rowIndex}-${colIndex}`}
            cell={cell}
            row={rowIndex}
            col={colIndex}
            isExploded={
              explodedCell?.row === rowIndex && explodedCell?.col === colIndex
            }
            onOpen={onOpen}
            onToggleFlag={onToggleFlag}
          />
        )),
      )}
    </div>
  );
}

export default Board;
