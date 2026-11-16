import {
  CELL_STATE,
  CELL_TYPE,
  ROWS,
  COLS,
  DIRECTIONS,
} from '../constants/game';

// Чиста рекурсивна функція без мутацій вхідного об'єкта
export function revealCell(boardToReveal, targetRow, targetCol) {
  const newBoard = boardToReveal.map((row) => row.map((cell) => ({ ...cell })));
  const cell = newBoard[targetRow][targetCol];

  if (cell.state === CELL_STATE.OPENED || cell.state === CELL_STATE.FLAGGED) {
    return newBoard;
  }

  cell.state = CELL_STATE.OPENED;

  if (cell.type === CELL_TYPE.MINE) {
    cell.exploded = true;
    return newBoard;
  }

  if (cell.neighborMines === 0) {
    for (const [rowOffset, colOffset] of DIRECTIONS) {
      const neighborRow = targetRow + rowOffset;
      const neighborCol = targetCol + colOffset;

      if (
        neighborRow >= 0 &&
        neighborRow < ROWS &&
        neighborCol >= 0 &&
        neighborCol < COLS
      ) {
        // Проводимо рекурсію на прихованій копії та оновлюємо масив
        const updatedRecursiveBoard = revealCell(
          newBoard,
          neighborRow,
          neighborCol,
        );
        for (let rowIndex = 0; rowIndex < ROWS; rowIndex++) {
          for (let colIndex = 0; colIndex < COLS; colIndex++) {
            newBoard[rowIndex][colIndex] =
              updatedRecursiveBoard[rowIndex][colIndex];
          }
        }
      }
    }
  }

  return newBoard;
}
