import Cell from '../Cell/Cell';
import styles from './Board.module.css';

function Board({ board, cols, onOpenCell, onToggleFlag }) {
  return (
    <div
      className={styles.board}
      style={{
        gridTemplateColumns: `repeat(${cols}, var(--board-cell-size))`,
      }}
    >
      {board.map((rowCells) =>
        rowCells.map((cell) => (
          <Cell
            key={`${cell.row}-${cell.col}`}
            cell={cell}
            onOpen={onOpenCell}
            onToggleFlag={onToggleFlag}
          />
        )),
      )}
    </div>
  );
}

export default Board;
