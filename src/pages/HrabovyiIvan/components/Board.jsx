import { CELL_CONTENT, CELL_STATE, GAME_STATUS } from '../constants/game';
import { createCellKey } from '../utils/board';

import CellButton from './CellButton';

import styles from './Board.module.css';

function Board({
  board,
  gameStatus,
  explodedPosition,
  onCellClick,
  onCellRightClick,
}) {
  const columnCount = board[0].length;
  const isGameLost = gameStatus === GAME_STATUS.LOST;

  return (
    <div
      className={styles.board}
      role="group"
      aria-label="Minesweeper board"
      style={{ '--board-columns': columnCount }}
    >
      {board.map((boardRow, row) =>
        boardRow.map((cell, col) => (
          <CellButton
            key={createCellKey(row, col)}
            cell={cell}
            row={row}
            col={col}
            isExploded={
              explodedPosition?.row === row && explodedPosition?.col === col
            }
            isWrongFlag={
              isGameLost &&
              cell.state === CELL_STATE.FLAGGED &&
              cell.content === CELL_CONTENT.EMPTY
            }
            onReveal={onCellClick}
            onFlag={onCellRightClick}
          />
        )),
      )}
    </div>
  );
}

export default Board;
