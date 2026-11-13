import CellButton from './CellButton';

import styles from './Board.module.css';

function Board({ board, onReveal, onFlag }) {
  return (
    <div className={styles.board} role="grid" aria-label="Minesweeper board">
      {board.map((boardRow, row) => (
        <div key={row} className={styles.row} role="row">
          {boardRow.map((cell, col) => (
            <div key={col} className={styles.gridCell} role="gridcell">
              <CellButton
                cell={cell}
                row={row}
                col={col}
                onReveal={onReveal}
                onFlag={onFlag}
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Board;