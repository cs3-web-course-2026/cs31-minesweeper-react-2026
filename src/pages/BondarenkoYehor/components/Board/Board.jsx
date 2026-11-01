import Cell from '../Cell/Cell';
import styles from './Board.module.css';

function Board({ board, cols, status, explodedCell, onOpen, onFlag }) {
  return (
    <div className={styles.board} style={{ '--cols': cols }}>
      {board.map((line, row) =>
        line.map((cell, col) => (
          <Cell
            key={`${row}-${col}`}
            cell={cell}
            row={row}
            col={col}
            status={status}
            isExploded={explodedCell?.row === row && explodedCell?.col === col}
            onOpen={onOpen}
            onFlag={onFlag}
          />
        )),
      )}
    </div>
  );
}

export default Board;
