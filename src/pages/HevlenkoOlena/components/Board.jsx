import Cell from './Cell';
import styles from './Board.module.css';

export default function Board({
  field,
  status,
  explodedCell,
  onOpenCell,
  onToggleFlag,
}) {
  const rows = field.length;
  const cols = field[0]?.length ?? 0;
  const isGameOver = status !== 'process';

  return (
    <section
      className={styles.gridField}
      style={{ '--rows': rows, '--cols': cols }}
      aria-label="Ігрове поле Сапер"
    >
      {field.map((rowItems, rowIndex) =>
        rowItems.map((cell, colIndex) => {
          const isExploded =
            explodedCell !== null &&
            explodedCell.row === rowIndex &&
            explodedCell.col === colIndex;

          return (
            <Cell
              key={`${rowIndex}-${colIndex}`}
              cell={cell}
              row={rowIndex}
              col={colIndex}
              isGameOver={isGameOver}
              isExploded={isExploded}
              onOpen={onOpenCell}
              onToggleFlag={onToggleFlag}
            />
          );
        }),
      )}
    </section>
  );
}