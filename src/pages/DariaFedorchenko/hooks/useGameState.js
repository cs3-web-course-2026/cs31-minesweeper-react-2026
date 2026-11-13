import { useEffect, useState } from 'react';
import { createBoard } from '../utils/board';
import { checkVictory, getRemainingMines } from '../utils/check';
import { revealCells } from '../utils/reveal';
import { GAME_STATUS } from '../constants/game';

export default function useGameState() {
  const [board, setBoard] = useState(() => createBoard());
  const [status, setStatus] = useState(GAME_STATUS.PLAYING);
  const [time, setTime] = useState(0);
  const [explodedCell, setExplodedCell] = useState(null);

  useEffect(() => {
    if (status !== GAME_STATUS.PLAYING) return;

    const interval = setInterval(() => {
      setTime((previousTime) => previousTime + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [status]);

  function openCell(row, col) {
    if (status !== GAME_STATUS.PLAYING) return;

    const currentCell = board[row][col];

    if (currentCell.state !== 'closed') return;

    const newBoard = board.map((boardRow) =>
      boardRow.map((cell) => ({ ...cell })),
    );

    if (currentCell.isMine) {
      newBoard[row][col].state = 'opened';

      newBoard.forEach((boardRow) => {
        boardRow.forEach((cell) => {
          if (cell.isMine) {
            cell.state = 'opened';
          }
        });
      });

      setExplodedCell({ row, col });
      setBoard(newBoard);
      setStatus(GAME_STATUS.LOSE);
      return;
    }

    revealCells(newBoard, row, col);
    setBoard(newBoard);

    if (checkVictory(newBoard)) {
      setStatus(GAME_STATUS.WIN);
    }
  }

  function toggleFlag(row, col) {
    if (status !== GAME_STATUS.PLAYING) return;

    const currentCell = board[row][col];

    if (currentCell.state === 'opened') return;

    const flagsLeft = getRemainingMines(board);

    if (currentCell.state === 'closed' && flagsLeft <= 0) {
      return;
    }

    const newBoard = board.map((boardRow) =>
      boardRow.map((cell) => ({ ...cell })),
    );

    newBoard[row][col].state =
      currentCell.state === 'flagged' ? 'closed' : 'flagged';

    setBoard(newBoard);
  }

  function restartGame() {
    setBoard(createBoard());
    setStatus(GAME_STATUS.PLAYING);
    setTime(0);
    setExplodedCell(null);
  }

  return {
    board,
    status,
    time,
    explodedCell,
    openCell,
    toggleFlag,
    restartGame,
    remainingMines: getRemainingMines(board),
  };
}
