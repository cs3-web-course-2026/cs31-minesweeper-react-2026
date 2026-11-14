import CellButton from './CellButton';

import styles from './Board.module.css';

function Board({
                 board,
                 gameStatus,
                 onReveal,
                 onFlag,
               }) {
  return (
    <div className={styles.board} aria-label="Ігрове поле Сапера">
      {board.map((boardRow, row) =>
        boardRow.map((cell, col) => (
          <CellButton
            key={`${row}-${col}`}
            cell={cell}
            row={row}
            col={col}
            gameStatus={gameStatus}
            onReveal={onReveal}
            onFlag={onFlag}
          />
        )),
      )}
    </div>
  );
}

export default Board;
