import { CELL_CONTENT, CELL_STATE } from '../constants/game';
import { getNeighbourPositions } from './board';

// Відкриває клітинку та сусідні порожні клітинки
export function revealCell(board, startRow, startCol) {
  const rows = board.length;
  const cols = board[0].length;

  // Створюємо копію поля
  const newBoard = board.map((row) =>
    row.map((cell) => ({ ...cell })),
  );

  const firstCell = newBoard[startRow][startCol];

  // Не відкриваємо прапорці та вже відкриті клітинки
  if (firstCell.state !== CELL_STATE.CLOSED) {
    return newBoard;
  }

  // Якщо натрапили на міну, відкриваємо її
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

    // Якщо поруч є міни, сусідні клітинки не відкриваємо
    if (cell.adjacentMines > 0) {
      continue;
    }

    // Додаємо закритих сусідів до черги
    const neighbours = getNeighbourPositions(row, col, rows, cols);

    neighbours.forEach(([neighbourRow, neighbourCol]) => {
      const neighbour = newBoard[neighbourRow][neighbourCol];

      if (
        neighbour.state === CELL_STATE.CLOSED &&
        neighbour.content === CELL_CONTENT.EMPTY
      ) {
        queue.push([neighbourRow, neighbourCol]);
      }
    });
  }

  return newBoard;
}