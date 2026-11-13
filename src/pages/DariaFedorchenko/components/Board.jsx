import CellButton from "./CellButton";
import styles from "./Board.module.css";

export default function Board({ board, status, explodedCell, onOpen, onFlag }) {
  return (
    <div className={styles.board}>
      {board.map((row, rowIndex) => (
        <div className={styles.row} key={rowIndex}>
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
