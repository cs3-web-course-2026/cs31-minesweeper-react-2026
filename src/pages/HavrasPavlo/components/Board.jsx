import CellButton from './CellButton';

import styles from './Board.module.css';


function Board({ board, onReveal, onFlag }) {
  return (
    <div
      className={styles.board}
      role="grid"
      aria-label="Ігрове поле"
    >
      {board.map((rowCells, rowIndex) =>
        rowCells.map((cell, colIndex) => (
          <CellButton
            key={`${rowIndex}-${colIndex}`}
            cell={cell}
            row={rowIndex}
            col={colIndex}
            onReveal={onReveal}
            onFlag={onFlag}
          />
        )),
      )}
    </div>
  );
}


export default Board;
