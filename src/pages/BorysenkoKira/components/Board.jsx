import CellButton from './CellButton';
import styles from './Board.module.css';

export default function Board({
  board,
  gameStatus,
  explodedCell,
  onOpenCell,
  onToggleFlag,
}) {
  return (
    <section className={styles.gameBoard}>
      {board.map((row) =>
        row.map((cell) => {
          const isExploded =
            explodedCell?.row === cell.row && explodedCell?.col === cell.col;

          return (
            <CellButton
              key={`${cell.row}-${cell.col}`}
              cell={cell}
              gameStatus={gameStatus}
              isExploded={isExploded}
              onOpen={onOpenCell}
              onToggleFlag={onToggleFlag}
            />
          );
        })
      )}
    </section>
  );
}