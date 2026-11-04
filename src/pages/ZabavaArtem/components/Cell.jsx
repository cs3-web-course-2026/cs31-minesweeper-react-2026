import styles from './Cell.module.css';

const NUMBER_CLASS = {
  1: styles.numberOne,
  2: styles.numberTwo,
  3: styles.numberThree,
  4: styles.numberFour,
  5: styles.numberFive,
  6: styles.numberSix,
  7: styles.numberSeven,
  8: styles.numberEight,
};

export default function Cell({ cell, row, col, label, onOpen, onToggleFlag }) {
  const classNames = [styles.cell, styles[cell.state]];
  let content = null;

  if (cell.state === 'opened' && cell.type === 'mine') {
    classNames.push(styles.mine);
    if (cell.isExploded) classNames.push(styles.exploded);
    content = '💣';
  } else if (cell.state === 'opened' && cell.neighborMines > 0) {
    classNames.push(NUMBER_CLASS[cell.neighborMines]);
    content = cell.neighborMines;
  } else if (cell.state === 'flagged') {
    content = '🚩';
  }

  function handleContextMenu(event) {
    event.preventDefault();
    onToggleFlag(row, col);
  }

  return (
    <button
      className={classNames.filter(Boolean).join(' ')}
      type="button"
      aria-label={label}
      onClick={() => onOpen(row, col)}
      onContextMenu={handleContextMenu}
    >
      {content}
    </button>
  );
}
