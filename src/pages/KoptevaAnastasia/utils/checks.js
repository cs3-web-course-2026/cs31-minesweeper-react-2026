import { CELL_STATE, CELL_TYPE } from '../constants/game';

export function isBoardCleared(board) {
  return board
    .flat()
    .every(
      (cell) =>
        cell.type === CELL_TYPE.MINE || cell.state === CELL_STATE.OPENED,
    );
}
