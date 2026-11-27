import React, { useState, useEffect } from 'react';
import {
  GAME_STATUS,
  CELL_STATE,
  CELL_TYPE,
  MINES_COUNT,
} from './constants/game';
import {
  initEmptyBoard,
  generateMines,
  revealAllMines,
  toggleFlagCell,
  countFlaggedCells,
} from './utils/board';
import { revealCell } from './utils/reveal';
import { checkWinCondition } from './utils/checks';
import GameStatus from './components/GameStatus';
import Board from './components/Board';
import styles from './Minesweeper.module.css';

export default function HaponenkoMariia() {
  // Виправляємо ініціалізацію: передаємо функцію initEmptyBoard одразу в стейт
  const [board, setBoard] = useState(() => initEmptyBoard());
  const [status, setStatus] = useState(GAME_STATUS.PROCESS);
  const [flagsCount, setFlagsCount] = useState(0);
  const [gameTime, setGameTime] = useState(0);
  const [isFirstClick, setIsFirstClick] = useState(true);

  const handleRestart = () => {
    setBoard(initEmptyBoard());
    setStatus(GAME_STATUS.PROCESS);
    setFlagsCount(0);
    setGameTime(0);
    setIsFirstClick(true);
  };

  useEffect(() => {
    let timer;
    if (status === GAME_STATUS.PROCESS && !isFirstClick) {
      timer = setInterval(() => {
        setGameTime((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [status, isFirstClick]);

  const handleCellClick = (rowIndex, colIndex) => {
    if (status !== GAME_STATUS.PROCESS) return;
    if (
      board[rowIndex][colIndex].state === CELL_STATE.FLAGGED ||
      board[rowIndex][colIndex].state === CELL_STATE.OPENED
    )
      return;

    let activeBoard = board.map((row) => row.map((cell) => ({ ...cell })));

    if (isFirstClick) {
      setIsFirstClick(false);
      activeBoard = generateMines(activeBoard, rowIndex, colIndex);
    }

    const updatedBoard = revealCell(activeBoard, rowIndex, colIndex);

    if (updatedBoard[rowIndex][colIndex].type === CELL_TYPE.MINE) {
      // Виносимо логіку відкриття мін у чисту утиліту revealAllMines
      const lostBoard = revealAllMines(updatedBoard);
      setBoard(lostBoard);
      setFlagsCount(countFlaggedCells(lostBoard));
      setStatus(GAME_STATUS.LOSE);
    } else if (checkWinCondition(updatedBoard)) {
      setBoard(updatedBoard);
      setStatus(GAME_STATUS.WIN);
    } else {
      setBoard(updatedBoard);
    }
  };

  const handleCellContext = (rowIndex, colIndex) => {
    if (status !== GAME_STATUS.PROCESS) return;

    // Виносимо логіку роботи з прапорцями в чисту утиліту toggleFlagCell
    const { newBoard, newFlagsCount } = toggleFlagCell(
      board,
      rowIndex,
      colIndex,
      flagsCount,
    );

    setBoard(newBoard);
    setFlagsCount(newFlagsCount);
  };

  return (
    <div className={styles.container}>
      <main className={styles.minesweeper}>
        <GameStatus
          minesLeft={MINES_COUNT - flagsCount}
          gameTime={gameTime}
          status={status}
          onRestart={handleRestart}
        />
        <Board
          board={board}
          gameStatus={status}
          onCellClick={handleCellClick}
          onCellContext={handleCellContext}
        />
      </main>
    </div>
  );
}