import React, { useState, useEffect } from 'react';
import {
  GAME_STATUS,
  CELL_STATE,
  CELL_TYPE,
  ROWS,
  COLS,
  MINES_COUNT,
} from './constants/game';
import { initEmptyBoard, generateMines } from './utils/board';
import { revealCell } from './utils/reveal';
import { checkWinCondition } from './utils/checks';
import GameStatus from './components/GameStatus';
import Board from './components/Board';
import styles from './Minesweeper.module.css';

export default function HaponenkoMariia() {
  const [board, setBoard] = useState([]);
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
    handleRestart();
  }, []);

  useEffect(() => {
    let timer;
    if (status === GAME_STATUS.PROCESS && !isFirstClick) {
      timer = setInterval(() => {
        setGameTime((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [status, isFirstClick]);

  const handleCellClick = (row, col) => {
    if (status !== GAME_STATUS.PROCESS) return;
    if (
      board[row][col].state === CELL_STATE.FLAGGED ||
      board[row][col].state === CELL_STATE.OPENED
    )
      return;

    let activeBoard = board.map((r) => r.map((c) => ({ ...c })));

    if (isFirstClick) {
      setIsFirstClick(false);
      activeBoard = generateMines(activeBoard, row, col);
    }

    revealCell(activeBoard, row, col);

    if (activeBoard[row][col].type === CELL_TYPE.MINE) {
      for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
          if (activeBoard[r][c].type === CELL_TYPE.MINE) {
            activeBoard[r][c].state = CELL_STATE.OPENED;
          }
        }
      }
      setBoard(activeBoard);
      setStatus(GAME_STATUS.LOSE);
    } else if (checkWinCondition(activeBoard)) {
      setBoard(activeBoard);
      setStatus(GAME_STATUS.WIN);
    } else {
      setBoard(activeBoard);
    }
  };

  const handleCellContext = (row, col) => {
    if (status !== GAME_STATUS.PROCESS) return;
    const activeBoard = board.map((r) => r.map((c) => ({ ...c })));
    const cell = activeBoard[row][col];

    if (cell.state === CELL_STATE.OPENED) return;

    if (cell.state === CELL_STATE.CLOSED) {
      cell.state = CELL_STATE.FLAGGED;
      setFlagsCount((prev) => prev + 1);
    } else if (cell.state === CELL_STATE.FLAGGED) {
      cell.state = CELL_STATE.CLOSED;
      setFlagsCount((prev) => prev - 1);
    }
    setBoard(activeBoard);
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
