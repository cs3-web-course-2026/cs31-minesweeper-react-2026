import {
  CELL_STATE,
  CELL_TYPE,
  COUNTER_DIGITS,
  GAME_STATUS,
  MAX_DISPLAY_VALUE,
} from '../constants/game';


export function formatCounterValue(value) {
  const clampedValue = Math.min(Math.max(value, 0), MAX_DISPLAY_VALUE);

  return String(clampedValue).padStart(COUNTER_DIGITS, '0');
}


export function getCellAriaLabel(cell, row, col, status) {
  const positionText = `Рядок ${row + 1}, стовпець ${col + 1}`;

  if (cell.state === CELL_STATE.FLAGGED) {
    if (
      status !== GAME_STATUS.PROCESS &&
      cell.type === CELL_TYPE.MINE
    ) {
      return `${positionText}, клітинка з прапорцем на міні`;
    }

    return `${positionText}, клітинка з прапорцем`;
  }

  if (cell.state === CELL_STATE.CLOSED) {
    return `${positionText}, закрита клітинка`;
  }

  if (cell.type === CELL_TYPE.MINE) {
    return cell.isExploded
      ? `${positionText}, міна, на яку натиснули`
      : `${positionText}, клітинка з міною`;
  }

  if (cell.neighborMines > 0) {
    return `${positionText}, відкрита клітинка, мін навколо: ${cell.neighborMines}`;
  }

  return `${positionText}, відкрита порожня клітинка`;
}
