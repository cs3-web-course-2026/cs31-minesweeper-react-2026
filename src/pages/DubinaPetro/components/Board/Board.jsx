import Cell from '../Cell/Cell';
import styles from './Board.module.css';

function Board({ board, disabled, explodedCell, onOpen, onToggleFlag }) {
  return (
    <div
      className={styles.board}
      role="grid"
      aria-label="Minesweeper game board"
      style={{ '--board-columns': board[0].length }}
    >
      {board.flatMap((row, rowIndex) => row.map((cell, colIndex) => (
        <Cell
          key={`${rowIndex}-${colIndex}`}
          cell={cell}
          row={rowIndex}
          col={colIndex}
          disabled={disabled}
          isExploded={explodedCell?.row === rowIndex && explodedCell?.col === colIndex}
          onOpen={() => onOpen(rowIndex, colIndex)}
          onToggleFlag={() => onToggleFlag(rowIndex, colIndex)}
        />
      )))}
    </div>
  );
}

export default Board;
