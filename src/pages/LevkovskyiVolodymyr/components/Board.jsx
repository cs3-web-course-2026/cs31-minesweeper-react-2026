import { Cell } from './Cell';
import styles from './Board.module.css';

export function Board({
  board,
  rows,
  cols,
  gameStatus,
  explodedCoordinates,
  onOpenCell,
  onToggleFlag,
}) {
  const gridStyle = {
    gridTemplateColumns: `repeat(${cols}, var(--cell-size, 100px))`,
    gridTemplateRows: `repeat(${rows}, var(--cell-size, 100px))`,
  };

  return (
    <div className={styles.boardContainer}>
      <div
        className={styles.boardGrid}
        style={gridStyle}
        role="grid"
        aria-label="Minesweeper board"
      >
        {board.map((rowCells, rowIndex) =>
          rowCells.map((cell, colIndex) => {
            const isExplodedSource =
              explodedCoordinates !== null &&
              explodedCoordinates.row === rowIndex &&
              explodedCoordinates.col === colIndex;

            return (
              <Cell
                key={`${rowIndex}-${colIndex}`}
                cell={cell}
                row={rowIndex}
                col={colIndex}
                gameStatus={gameStatus}
                isExplodedSource={isExplodedSource}
                onOpen={onOpenCell}
                onToggleFlag={onToggleFlag}
              />
            );
          }),
        )}
      </div>
    </div>
  );
}
