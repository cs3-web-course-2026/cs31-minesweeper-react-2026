import CellButton from './CellButton';

import styles from './Board.module.css';

function Board({ board, status, onCellSelect, onCellFlag }) {
  const boardStyle = {
    '--board-rows': board.length,
    '--board-cols': board[0].length,
  };

  return (
    <section className={styles.scrollArea} aria-label="Ігрове поле">
      <div className={styles.board} style={boardStyle}>
        {board.map((boardRow, row) =>
          boardRow.map((cell, col) => (
            <CellButton
              key={`${row}-${col}`}
              cell={cell}
              row={row}
              col={col}
              status={status}
              onSelect={onCellSelect}
              onFlag={onCellFlag}
            />
          )),
        )}
      </div>
    </section>
  );
}

export default Board;
