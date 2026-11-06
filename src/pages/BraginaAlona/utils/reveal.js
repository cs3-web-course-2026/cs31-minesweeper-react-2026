import { CELL_CONTENT, CELL_STATE } from '../constants/game';

// Відкриває клітинку та сусідні порожні 
export function revealCell(board, startRow, startCol) {
  const rows = board.length;
  const cols = board[0].length;

  // Початкове поле
  const newBoard = board.map((row) =>
    row.map((cell) => ({ ...cell })),
  );

  const firstCell = newBoard[startRow][startCol];

  // Не відкриваємо прапорці та вже відкриті клітинки
  if (firstCell.state !== CELL_STATE.CLOSED) {
    return newBoard;
  }

  // Прапорець перевіряємо до відкриття клітинки
  if (firstCell.content === CELL_CONTENT.MINE) {
    firstCell.state = CELL_STATE.OPEN;
    return newBoard;
  }

  const queue = [[startRow, startCol]];
  const visited = new Set();

  while (queue.length > 0) {
    const [row, col] = queue.shift();
    const key = `${row}-${col}`;

    if (visited.has(key)) {
      continue;
    }

    visited.add(key);

    const cell = newBoard[row][col];

    if (cell.state !== CELL_STATE.CLOSED) {
      continue;
    }

    cell.state = CELL_STATE.OPEN;

    // Якщо навколо є міни, сусідні клітинки не відкриваємо
    if (cell.adjacentMines > 0) {
      continue;
    }

    // Перевіряємо всі вісім сусідніх клітинок
    for (let rowOffset = -1; rowOffset <= 1; rowOffset++) {
      for (let colOffset = -1; colOffset <= 1; colOffset++) {
        const neighbourRow = row + rowOffset;
        const neighbourCol = col + colOffset;

        const isCurrentCell = rowOffset === 0 && colOffset === 0;

        const isInsideBoard =
          neighbourRow >= 0 &&
          neighbourRow < rows &&
          neighbourCol >= 0 &&
          neighbourCol < cols;

        if (!isInsideBoard || isCurrentCell) {
          continue;
        }

        const neighbour = newBoard[neighbourRow][neighbourCol];

        if (
          neighbour.state === CELL_STATE.CLOSED &&
          neighbour.content === CELL_CONTENT.EMPTY
        ) {
          queue.push([neighbourRow, neighbourCol]);
        }
      }
    }
  }

  return newBoard;
}