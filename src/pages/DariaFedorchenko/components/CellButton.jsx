import styles from "./CellButton.module.css";

export default function CellButton({
  cell,
  row,
  col,
  status,
  explodedCell,
  onOpen,
  onFlag,
}) {
  const isExploded = explodedCell?.row === row && explodedCell?.col === col;

  let content = "";

  if (cell.state === "flagged") {
    content = "🚩";
  } else if (cell.state === "opened") {
    if (cell.isMine) {
      content = "💣";
    } else if (cell.neighborMines > 0) {
      content = cell.neighborMines;
    }
  }

  return (
    <button
      type='button'
      className={`${styles.cell} ${
        cell.state === "opened" ? styles.opened : ""
      } ${isExploded ? styles.exploded : ""}`}
      onClick={() => onOpen(row, col)}
      onContextMenu={(event) => {
        event.preventDefault();
        onFlag(row, col);
      }}
      disabled={status !== "playing"}
      aria-label={
        cell.isMine && cell.state === "opened"
          ? "Mine"
          : `Cell ${row + 1}, ${col + 1}`
      }
    >
      {content}
    </button>
  );
}
