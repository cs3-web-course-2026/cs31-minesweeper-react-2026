import { CELL_STATE, CELL_TYPE, GAME_STATUS } from '../constants/game';

import styles from './CellButton.module.css';

const NUMBER_CLASSES = [
  '',
  styles.numberOne,
  styles.numberTwo,
  styles.numberThree,
  styles.numberFour,
  styles.numberFive,
  styles.numberSix,
  styles.numberSeven,
  styles.numberEight,
];

export default function CellButton({
  cell,
  row,
  col,
  status,
  isFinished,
  tabIndex,
  buttonRef,
  onReveal,
  onFlag,
  onCellFocus,
  onCellKeyDown,
}) {
  const isOpened = cell.state === CELL_STATE.OPENED;
  const isFlagged = cell.state === CELL_STATE.FLAGGED;
  const isMine = cell.type === CELL_TYPE.MINE;
  const hasLost = status === GAME_STATUS.LOST;
  const isVisibleMine = isMine && (isOpened || (hasLost && !isFlagged));
  const isWrongFlag = hasLost && isFlagged && !isMine;
  const classes = [
    styles.cell,
    isOpened || isVisibleMine ? styles.opened : styles.closed,
    isFlagged && styles.flagged,
    isMine && isOpened && styles.exploded,
    hasLost && isFlagged && isMine && styles.correctFlag,
    isOpened && !isMine && NUMBER_CLASSES[cell.neighborMines],
  ]
    .filter(Boolean)
    .join(' ');
  let content = '';
  let description = 'закрита клітинка';

  if (isWrongFlag) {
    content = '×';
    description = 'помилковий прапорець';
  } else if (isFlagged) {
    content = '🚩';
    description = 'прапорець';
  } else if (isVisibleMine) {
    content = '💣';
    description = 'міна';
  } else if (isOpened) {
    content = cell.neighborMines || '';
    description =
      cell.neighborMines === 0
        ? 'порожня відкрита клітинка'
        : `відкрита клітинка, мін поруч: ${cell.neighborMines}`;
  }

  function handleContextMenu(event) {
    event.preventDefault();
    onFlag(row, col);
  }

  return (
    <button
      ref={buttonRef}
      type="button"
      className={classes}
      aria-label={`Рядок ${row + 1}, стовпець ${col + 1}: ${description}`}
      aria-disabled={isOpened || isFinished}
      disabled={isFinished}
      tabIndex={tabIndex}
      onClick={() => onReveal(row, col)}
      onContextMenu={handleContextMenu}
      onFocus={() => onCellFocus(row, col)}
      onKeyDown={(event) => onCellKeyDown(event, row, col)}
    >
      <span
        aria-hidden="true"
        className={isWrongFlag ? styles.wrongFlag : undefined}
      >
        {content}
      </span>
    </button>
  );
}
