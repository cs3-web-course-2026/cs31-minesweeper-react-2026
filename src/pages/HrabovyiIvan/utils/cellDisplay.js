import {
  CELL_CONTENT,
  CELL_LABEL,
  CELL_STATE,
  CELL_SYMBOL,
} from '../constants/game';

export function getCellSymbol(cell) {
  if (cell.state === CELL_STATE.FLAGGED) {
    return CELL_SYMBOL.FLAG;
  }

  if (cell.state !== CELL_STATE.OPEN) {
    return '';
  }

  if (cell.content === CELL_CONTENT.MINE) {
    return CELL_SYMBOL.MINE;
  }

  return cell.adjacentMines > 0 ? String(cell.adjacentMines) : '';
}

function getCellDescription(cell, isExploded, isWrongFlag) {
  if (isExploded) {
    return CELL_LABEL.EXPLODED_MINE;
  }

  if (isWrongFlag) {
    return CELL_LABEL.WRONG_FLAG;
  }

  if (cell.state === CELL_STATE.FLAGGED) {
    return CELL_LABEL.FLAGGED;
  }

  if (cell.state === CELL_STATE.CLOSED) {
    return CELL_LABEL.CLOSED;
  }

  if (cell.content === CELL_CONTENT.MINE) {
    return CELL_LABEL.MINE;
  }

  if (cell.adjacentMines === 0) {
    return CELL_LABEL.OPEN_NO_MINES;
  }

  return `${CELL_LABEL.OPEN_WITH_MINES}: ${cell.adjacentMines}`;
}

export function getCellLabel(cell, row, col, isExploded, isWrongFlag) {
  const description = getCellDescription(cell, isExploded, isWrongFlag);

  return `Row ${row + 1}, column ${col + 1}, ${description}`;
}
