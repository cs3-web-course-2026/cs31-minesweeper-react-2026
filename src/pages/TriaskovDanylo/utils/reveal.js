import {
  CELL_STATE,
  CELL_TYPE,
  DIRECTIONS,
  GAME_STATUS,
} from '../constants/game';
import { cloneBoard } from './board';
import { checkWinCondition, getFlaggedCellsCount, isInBounds } from './checks';


export function revealAllMines(field) {
  return field.map((rowCells) =>
    rowCells.map((cell) => {
      if (
        cell.type === CELL_TYPE.MINE &&
        cell.state === CELL_STATE.CLOSED
      ) {
        return {
          ...cell,
          state: CELL_STATE.OPENED,
        };
      }

      return cell;
    }),
  );
}


function floodFillOpen(field, row, col) {
  if (!isInBounds(field, row, col)) {
    return;
  }

  const cell = field[row][col];

  if (
    cell.state === CELL_STATE.OPENED ||
    cell.state === CELL_STATE.FLAGGED ||
    cell.type === CELL_TYPE.MINE
  ) {
    return;
  }

  cell.state = CELL_STATE.OPENED;

  if (cell.neighborMines === 0) {
    for (const [directionalRow, directionalCol] of DIRECTIONS) {
      const neighbourRow = row + directionalRow;
      const neighbourCol = col + directionalCol;

      if (isInBounds(field, neighbourRow, neighbourCol)) {
        floodFillOpen(field, neighbourRow, neighbourCol);
      }
    }
  }
}


// Логіка відкриття клітинки та рекурсивного відкриття порожніх сусідів
export function openCellAt(field, row, col) {
  if (!isInBounds(field, row, col)) {
    return {
      board: field,
      status: GAME_STATUS.PROCESS,
      hasChanged: false,
    };
  }

  const targetCell = field[row][col];

  if (
    targetCell.state === CELL_STATE.OPENED ||
    targetCell.state === CELL_STATE.FLAGGED
  ) {
    return {
      board: field,
      status: GAME_STATUS.PROCESS,
      hasChanged: false,
    };
  }

  const nextBoard = cloneBoard(field);
  const cell = nextBoard[row][col];

  if (cell.type === CELL_TYPE.MINE) {
    cell.state = CELL_STATE.OPENED;
    cell.isExploded = true;

    return {
      board: revealAllMines(nextBoard),
      status: GAME_STATUS.LOSE,
      hasChanged: true,
    };
  }

  floodFillOpen(nextBoard, row, col);

  const nextStatus = checkWinCondition(nextBoard)
    ? GAME_STATUS.WIN
    : GAME_STATUS.PROCESS;

  return {
    board: nextBoard,
    status: nextStatus,
    hasChanged: true,
  };
}


export function toggleFlagAt(field, row, col, minesCount) {
  if (!isInBounds(field, row, col)) {
    return field;
  }

  const targetCell = field[row][col];

  if (targetCell.state === CELL_STATE.OPENED) {
    return field;
  }

  if (targetCell.state === CELL_STATE.CLOSED) {
    const flaggedCount = getFlaggedCellsCount(field);

    if (flaggedCount >= minesCount) {
      return field;
    }
  }

  const nextState =
    targetCell.state === CELL_STATE.CLOSED
      ? CELL_STATE.FLAGGED
      : CELL_STATE.CLOSED;

  return field.map((rowCells, rowIndex) =>
    rowCells.map((cell, colIndex) => {
      if (rowIndex === row && colIndex === col) {
        return {
          ...cell,
          state: nextState,
        };
      }

      return cell;
    }),
  );
}
