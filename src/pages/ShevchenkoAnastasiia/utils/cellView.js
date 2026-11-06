import { CELL_CONTENT, CELL_STATE, GAME_STATUS } from '../constants/game';
import { CELL_SYMBOL, CELL_VIEW } from '../constants/ui';

function describeOpenCell(cell) {
  if (cell.adjacentMines === 0) {
    return { view: CELL_VIEW.OPEN, symbol: '', description: 'порожня' };
  }

  return {
    view: CELL_VIEW.OPEN,
    symbol: String(cell.adjacentMines),
    description: `поруч мін: ${cell.adjacentMines}`,
  };
}

export function getCellView(cell, status) {
  const isLost = status === GAME_STATUS.LOST;
  const isMine = cell.content === CELL_CONTENT.MINE;

  if (cell.state === CELL_STATE.FLAGGED) {
    return {
      view: isLost && isMine ? CELL_VIEW.FLAGGED_CORRECTLY : CELL_VIEW.FLAGGED,
      symbol: CELL_SYMBOL.FLAG,
      description: 'прапорець',
    };
  }

  if (cell.state === CELL_STATE.OPEN) {
    return isMine
      ? {
          view: CELL_VIEW.MINE_CLICKED,
          symbol: CELL_SYMBOL.MINE,
          description: 'міна',
        }
      : describeOpenCell(cell);
  }

  if (isLost && isMine) {
    return {
      view: CELL_VIEW.MINE,
      symbol: CELL_SYMBOL.MINE,
      description: 'міна',
    };
  }

  return { view: CELL_VIEW.CLOSED, symbol: '', description: 'закрита' };
}
