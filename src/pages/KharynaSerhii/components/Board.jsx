import Cell from './Cell';
import styles from './Board.module.css';

/**
 * Малює сітку клітинок за двовимірним масивом поля.
 * @param {Object} props Властивості компонента.
 * @param {Array[]} props.board Ігрове поле.
 * @param {string} props.status Поточний статус гри.
 * @param {Function} props.onOpen Обробник відкриття клітинки.
 * @param {Function} props.onFlag Обробник перемикання прапорця.
 * @returns {JSX.Element} Ігрове поле.
 */
function Board({ board, status, onOpen, onFlag }) {

  return (
    <div className={styles.board} style={{ '--board-columns': board[0].length }}>
      {board.map((cells, row) => cells.map((cell, col) => (
        <Cell
          key={`${row}-${col}`}
          cell={cell}
          row={row}
          col={col}
          status={status}
          onOpen={onOpen}
          onFlag={onFlag}
        />
      )))}
    </div>
  );
}

export default Board;
