import styles from './Cell.module.css';

export default function Cell({
  cell,
  row,
  col,
  isGameOver,
  isExploded,
  onOpen,
  onToggleFlag,
}) {
  const classNames = [styles.tile];
  let content = '';
  let ariaLabel = `Рядок ${row + 1}, стовпець ${col + 1}: закрита клітинка`;

  if (cell.state === 'flagged') {
    classNames.push(styles.flagged);
    if (isGameOver && cell.type === 'mine') {
      classNames.push(styles.defused);
      ariaLabel = `Рядок ${row + 1}, стовпець ${col + 1}: знешкоджена міна`;
    } else if (isGameOver && cell.type !== 'mine') {
      classNames.push(styles.wrong);
      ariaLabel = `Рядок ${row + 1}, стовпець ${col + 1}: помилковий прапорець`;
    } else {
      ariaLabel = `Рядок ${row + 1}, стовпець ${col + 1}: прапорець`;
    }
  } else if (isGameOver && cell.type === 'mine') {
    classNames.push(styles.mine);
    if (isExploded) {
      classNames.push(styles.boom);
      ariaLabel = `Рядок ${row + 1}, стовпець ${col + 1}: підірвана міна`;
    } else {
      ariaLabel = `Рядок ${row + 1}, стовпець ${col + 1}: міна`;
    }
  } else if (cell.state === 'opened') {
    classNames.push(styles.open);
    if (cell.neighborMines > 0) {
      classNames.push(styles[`num${cell.neighborMines}`]);
      content = String(cell.neighborMines);
      ariaLabel = `Рядок ${row + 1}, стовпець ${col + 1}: мін поруч ${cell.neighborMines}`;
    } else {
      ariaLabel = `Рядок ${row + 1}, стовпець ${col + 1}: порожня відкрита клітинка`;
    }
  } else {
    classNames.push(styles.closed);
  }

  const handleContextMenu = (event) => {
    event.preventDefault();
    onToggleFlag(row, col);
  };

  return (
    <button
      type="button"
      className={classNames.join(' ')}
      onClick={() => onOpen(row, col)}
      onContextMenu={handleContextMenu}
      aria-label={ariaLabel}
    >
      {content}
    </button>
  );
}