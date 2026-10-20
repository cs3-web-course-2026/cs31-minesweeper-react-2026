import { CELL_STATE, CELL_CONTENT } from '../constants/game.js';
import { getNeighbours } from './board.js';
import { isInBounds } from './checks.js';


export function openArea(board, row, col, rows, cols) {
  for (const [neighbourRow, neighbourCol] of getNeighbours(row, col, rows, cols)) {
    const neighbour = board[neighbourRow][neighbourCol];

    if (neighbour.state === CELL_STATE.CLOSED) {
      neighbour.state = CELL_STATE.OPEN;

      if (neighbour.adjacentMines === 0 && neighbour.content === CELL_CONTENT.EMPTY) {
        openArea(board, neighbourRow, neighbourCol, rows, cols);
      }
    }
  }

  return board;
}


export function revealAllMines(board) {
  return board.map((rowCells) =>
    rowCells.map((cell) => {
      if (cell.content === CELL_CONTENT.MINE && cell.state !== CELL_STATE.FLAGGED) {
        return {
          ...cell,
          state: CELL_STATE.OPEN,
        };
      }

      return { ...cell };
    }),
  );
}


export function revealCell(currentBoard, targetRow, targetCol) {
  const rows = currentBoard.length;
  const cols = currentBoard[0].length;

  if (!isInBounds(targetRow, targetCol, rows, cols)) {
    return {
      updatedBoard: currentBoard,
      hitMine: false,
    };
  }

  const targetCell = currentBoard[targetRow][targetCol];

  if (targetCell.state !== CELL_STATE.CLOSED) {
    return {
      updatedBoard: currentBoard,
      hitMine: false,
    };
  }

  // Створюємо глибоку копію поля для забезпечення незмінності стану
  const clonedBoard = currentBoard.map((rowCells) =>
    rowCells.map((cell) => ({ ...cell })),
  );

  const cellToReveal = clonedBoard[targetRow][targetCol];
  cellToReveal.state = CELL_STATE.OPEN;

  if (cellToReveal.content === CELL_CONTENT.MINE) {
    cellToReveal.isExploded = true;
    const boardWithMines = revealAllMines(clonedBoard);

    return {
      updatedBoard: boardWithMines,
      hitMine: true,
    };
  }

  if (cellToReveal.adjacentMines === 0) {
    openArea(clonedBoard, targetRow, targetCol, rows, cols);
  }

  return {
    updatedBoard: clonedBoard,
    hitMine: false,
  };
}


export function toggleFlagAt(currentBoard, targetRow, targetCol) {
  const rows = currentBoard.length;
  const cols = currentBoard[0].length;

  if (!isInBounds(targetRow, targetCol, rows, cols)) {
    return currentBoard;
  }

  const targetCell = currentBoard[targetRow][targetCol];

  if (targetCell.state === CELL_STATE.OPEN) {
    return currentBoard;
  }

  return currentBoard.map((rowCells, rowIndex) =>
    rowCells.map((cell, colIndex) => {
      if (rowIndex === targetRow && colIndex === targetCol) {
        const nextState =
          cell.state === CELL_STATE.CLOSED
            ? CELL_STATE.FLAGGED
            : CELL_STATE.CLOSED;

        return {
          ...cell,
          state: nextState,
        };
      }

      return cell;
    }),
  );
}
