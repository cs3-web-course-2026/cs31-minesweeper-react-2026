import { CELL_STATE, CELL_TYPE, GAME_STATUS } from '../constants/game';

import styles from './CellButton.module.css';

function CellButton({
                      cell,
                      row,
                      col,
                      gameStatus,
                      onReveal,
                      onFlag,
                    }) {
  const isGameOver =
    gameStatus === GAME_STATUS.WON ||
    gameStatus === GAME_STATUS.LOST;

  const isRevealed =
    cell.state === CELL_STATE.OPEN ||
    (gameStatus === GAME_STATUS.LOST &&
      cell.type === CELL_TYPE.MINE);

  const isFlagged = cell.state === CELL_STATE.FLAGGED;
  const isMine = cell.type === CELL_TYPE.MINE;

  const isCorrectFlag =
    isFlagged && isMine && gameStatus === GAME_STATUS.LOST;

  const isIncorrectFlag =
    isFlagged && !isMine && gameStatus === GAME_STATUS.LOST;

  const cellClasses = [
    styles.cell,
    isRevealed ? styles.open : styles.closed,
    isFlagged ? styles.flagged : '',
    isCorrectFlag ? styles.correctFlag : '',
    isIncorrectFlag ? styles.incorrectFlag : '',
    isRevealed && isMine && !isFlagged ? styles.mine : '',
    isRevealed && isMine && cell.state === CELL_STATE.OPEN
      ? styles.mineHit
      : '',
    isRevealed && !isMine && cell.neighborMines > 0
      ? styles[`number${cell.neighborMines}`]
      : '',
  ]
    .filter(Boolean)
    .join(' ');

  let cellContent = '';
  let cellDescription = 'Закрита клітинка';

  if (isFlagged) {
    cellContent = '⚑';

    if (isCorrectFlag) {
      cellDescription = 'Правильно позначена міна';
    } else if (isIncorrectFlag) {
      cellDescription = 'Помилково встановлений прапорець';
    } else {
      cellDescription = 'Клітинка з прапорцем';
    }
  } else if (isRevealed && isMine) {
    cellContent = '💣';
    cellDescription = 'Міна';
  } else if (isRevealed && cell.neighborMines > 0) {
    cellContent = cell.neighborMines;
    cellDescription = `Сусідніх мін: ${cell.neighborMines}`;
  } else if (isRevealed) {
    cellDescription = 'Порожня клітинка';
  }

  const handleContextMenu = (event) => {
    event.preventDefault();
    onFlag(row, col);
  };

  return (
    <button
      type="button"
      className={cellClasses}
      aria-label={`Рядок ${row + 1}, стовпець ${col + 1}. ${cellDescription}`}
      onClick={() => onReveal(row, col)}
      onContextMenu={handleContextMenu}
      disabled={isGameOver}
    >
      {cellContent}
    </button>
  );
}

export default CellButton;
