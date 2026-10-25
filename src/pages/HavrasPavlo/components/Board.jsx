import CellButton from './CellButton';

import styles from './Board.module.css';


function Board({ board, onReveal, onFlag }) {
  return (
    <div
      className={styles.board}
      style={{
        '--board-rows': board.length,
        '--board-cols': board[0].length,
      }}
      role="group"
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
