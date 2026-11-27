import { CELL_TYPE, CELL_STATE } from '../constants/game';

export function checkWinCondition(board) {
  for (const row of board) {
    for (const cell of row) {
      if (cell.type === CELL_TYPE.EMPTY && cell.state !== CELL_STATE.OPENED) {
        return false;
      }
    }
  }
  return true;
}