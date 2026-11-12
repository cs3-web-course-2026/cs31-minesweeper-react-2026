import { useCallback, useState } from 'react';
import {
  DIFFICULTIES,
  STATUS,
  countFlags,
  createEmptyBoard,
  flagAllMines,
  hasExploded,
  isWon,
  placeMines,
  revealAllMines,
  revealCell,
  toggleFlag,
  getShuffledCells,
} from './gameLogic';

const createBoard = (difficultyKey) => {
  const { rows, cols } = DIFFICULTIES[difficultyKey];
  return createEmptyBoard(rows, cols);
};


export default function useMinesweeper(initialDifficulty = 'beginner') {
  const [difficulty, setDifficulty] = useState(initialDifficulty);
  const [board, setBoard] = useState(() => createBoard(initialDifficulty));
  const [status, setStatus] = useState(STATUS.IDLE);
  const [gameId, setGameId] = useState(0);

  const { mines } = DIFFICULTIES[difficulty];
  const minesLeft = mines - countFlags(board);
  const isFinished = status === STATUS.WON || status === STATUS.LOST;

  const restart = useCallback(
    (key = difficulty) => {
      setDifficulty(key);
      setBoard(createBoard(key));
      setStatus(STATUS.IDLE);
      setGameId((id) => id + 1);
    },
    [difficulty],
  );

  const finishIfNeeded = (nextBoard) => {
    if (hasExploded(nextBoard)) {
      setBoard(revealAllMines(nextBoard));
      setStatus(STATUS.LOST);
    } else if (isWon(nextBoard)) {
      setBoard(flagAllMines(nextBoard));
      setStatus(STATUS.WON);
    } else {
      setBoard(nextBoard);
    }
  };

const reveal = (row, col) => {
  if (isFinished || board[row][col].isFlagged) return;

  let current = board;
  if (status === STATUS.IDLE) {
    current = placeMines(board, mines, row, col, getShuffledCells(board));
    setStatus(STATUS.PLAYING);
  }
  finishIfNeeded(revealCell(current, row, col));
};

  const flag = (row, col) => {
    if (isFinished) return;
    setBoard((prevBoard) => toggleFlag(prevBoard, row, col));
  };

  return { board, status, difficulty, gameId, minesLeft, reveal, flag, restart };
}
