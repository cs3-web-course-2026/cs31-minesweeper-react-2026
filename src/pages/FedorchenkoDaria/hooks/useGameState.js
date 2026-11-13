import { useEffect, useState } from 'react';
import { createBoard } from '../utils/board';
import { checkVictory, getRemainingMines } from '../utils/check';
import { revealCells } from '../utils/reveal';
import { revealMinesOnLoss, toggleCellFlag } from '../utils/transitions';
import { GAME_STATUS, CELL_STATE, TIMER_INTERVAL } from '../constants/game';

export default function useGameState() {
  const [board, setBoard] = useState(() => createBoard());
  const [status, setStatus] = useState(GAME_STATUS.PLAYING);
  const [time, setTime] = useState(0);
  const [explodedCell, setExplodedCell] = useState(null);

  useEffect(() => {
    if (status !== GAME_STATUS.PLAYING) return;

    const interval = setInterval(() => {
      setTime((previousTime) => previousTime + 1);
    }, TIMER_INTERVAL);

    return () => clearInterval(interval);
  }, [status]);

  function openCell(row, col) {
    if (status !== GAME_STATUS.PLAYING) return;

    const currentCell = board[row][col];

    if (currentCell.state !== CELL_STATE.CLOSED) return;

    if (currentCell.isMine) {
      const newBoard = revealMinesOnLoss(board);

      setExplodedCell({ row, col });
      setBoard(newBoard);
      setStatus(GAME_STATUS.LOSE);
      return;
    }

    const newBoard = revealCells(board, row, col);

    setBoard(newBoard);

    if (checkVictory(newBoard)) {
      setStatus(GAME_STATUS.WIN);
    }
  }

  function toggleFlag(row, col) {
    if (status !== GAME_STATUS.PLAYING) return;

    const newBoard = toggleCellFlag(board, row, col);

    if (newBoard !== board) {
      setBoard(newBoard);
    }
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
