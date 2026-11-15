import React from 'react';
import CellButton from './CellButton';
import styles from './Board.module.css';

export default function Board({
  board,
  gameStatus,
  onCellClick,
  onCellContext,
}) {
  return (
    <div className={styles.board}>
      {board.map((row, rowIndex) =>
        row.map((cellData, colIndex) => (
          <CellButton
            key={`${rowIndex}-${colIndex}`}
            row={rowIndex}
            col={colIndex}
            cellData={cellData}
            gameStatus={gameStatus}
            onClick={onCellClick}
            onContextMenu={onCellContext}
          />
        )),
      )}
    </div>
  );
}
