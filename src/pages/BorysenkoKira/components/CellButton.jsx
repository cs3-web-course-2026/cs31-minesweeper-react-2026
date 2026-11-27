import { CELL_STATE, CELL_TYPE, GAME_STATUS } from '../constants/game';
import evilMinionImg from '../assets/evil-minion.png';
import customFlagImg from '../assets/custom-flag.png';
import styles from './CellButton.module.css';

export default function CellButton({
  cell,
  gameStatus,
  isExploded,
  onOpen,
  onToggleFlag,
}) {
  const { row, col, type, state, neighborMines } = cell;

  const handleContextMenu = (e) => {
    e.preventDefault();
    onToggleFlag(row, col);
  };

  const isOpened = state === CELL_STATE.OPENED;
  const isFlagged = state === CELL_STATE.FLAGGED;
  const isFalseFlag =
    isFlagged && gameStatus === GAME_STATUS.LOSE && type !== CELL_TYPE.MINE;

  const classNames = [
    styles.cell,
    isOpened ? styles.cellOpen : '',
    isOpened && type === CELL_TYPE.MINE ? styles.cellMine : '',
    isExploded ? styles.cellExploded : '',
    isFlagged ? styles.cellFlag : '',
    isFalseFlag ? styles.cellFalseFlag : '',
    isOpened && type === CELL_TYPE.EMPTY && neighborMines > 0
      ? styles[`num${neighborMines}`]
      : '',
  ]
    .filter(Boolean)
    .join(' ');

  const ariaLabel =
    `Рядок ${row + 1}, стовпець ${col + 1}: ${state}` +
    (isOpened
      ? `, ${type === CELL_TYPE.MINE ? 'міна' : `сусідніх мін: ${neighborMines}`}`
      : '');

  return (
    <button
      type="button"
      className={classNames}
      onClick={() => onOpen(row, col)}
      onContextMenu={handleContextMenu}
      aria-label={ariaLabel}
    >
      {isOpened && type === CELL_TYPE.MINE && (
        <img className={styles.icon} src={evilMinionImg} alt="Міна" />
      )}
      {isOpened && type === CELL_TYPE.EMPTY && neighborMines > 0 && neighborMines}
      {isFlagged && (
        <img className={styles.icon} src={customFlagImg} alt="Прапорець" />
      )}
    </button>
  );
}