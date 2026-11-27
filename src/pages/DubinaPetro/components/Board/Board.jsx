import Cell from '../Cell/Cell';
import styles from './Board.module.css';

function Board({ board, disabled, explodedCell, onOpen, onToggleFlag }) {
  return (
    <div
      className={styles.board}
      role="grid"
      aria-label="Minesweeper game board"
      aria-rowcount={board.length}
      aria-colcount={board[0].length}
      style={{ '--board-columns': board[0].length }}
    >
      {board.map((row, rowIndex) => (
        <div key={`row-${rowIndex}`} className={styles.row} role="row" aria-rowindex={rowIndex + 1}>
          {row.map((cell, colIndex) => (
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
          ))}
        </div>
      ))}
    </div>
  );
}

export default Board;
