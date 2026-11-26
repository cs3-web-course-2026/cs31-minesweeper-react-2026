import { useEffect, useState } from 'react';
import Board from './components/Board';
import CounterDisplay from './components/CounterDisplay';
import RestartButton from './components/RestartButton';
import {
  CELL_STATE,
  DEFAULT_COLS,
  DEFAULT_MINES,
  DEFAULT_ROWS,
  GAME_STATUS,
  checkWinCondition,
  countFlags,
  generateField,
  revealCells,
  toggleFlag,
} from './utils/gameLogic';
import styles from './MinesweeperGame.module.css';

export default function MinesweeperGame() {
  const [field, setField] = useState(() =>
    generateField(DEFAULT_ROWS, DEFAULT_COLS, DEFAULT_MINES),
  );
  const [status, setStatus] = useState(GAME_STATUS.PROCESS);
  const [gameTime, setGameTime] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [explodedCell, setExplodedCell] = useState(null);

  useEffect(() => {
    if (!isTimerRunning || status !== GAME_STATUS.PROCESS) {
      return undefined;
    }

    const timerId = setInterval(() => {
      setGameTime((prev) => Math.min(prev + 1, 999));
    }, 1000);

    return () => clearInterval(timerId);
  }, [isTimerRunning, status]);

  const handleOpenCell = (row, col) => {
    if (status !== GAME_STATUS.PROCESS) {
      return;
    }

    const targetCell = field[row]?.[col];
    if (
      !targetCell ||
      targetCell.state === CELL_STATE.OPENED ||
      targetCell.state === CELL_STATE.FLAGGED
    ) {
      return;
    }

    if (!isTimerRunning) {
      setIsTimerRunning(true);
    }

    const { nextField, hitMine } = revealCells(field, row, col);
    setField(nextField);

    if (hitMine) {
      setStatus(GAME_STATUS.LOSE);
      setExplodedCell({ row, col });
      setIsTimerRunning(false);
      return;
    }

    if (checkWinCondition(nextField)) {
      setStatus(GAME_STATUS.WIN);
      setIsTimerRunning(false);
    }
  };

  const handleToggleFlag = (row, col) => {
    if (status !== GAME_STATUS.PROCESS) {
      return;
    }

    const targetCell = field[row]?.[col];
    if (!targetCell || targetCell.state === CELL_STATE.OPENED) {
      return;
    }

    setField((prevField) => toggleFlag(prevField, row, col));
  };

  const handleRestart = () => {
    setField(generateField(DEFAULT_ROWS, DEFAULT_COLS, DEFAULT_MINES));
    setStatus(GAME_STATUS.PROCESS);
    setGameTime(0);
    setIsTimerRunning(false);
    setExplodedCell(null);
  };

  const remainingFlags = DEFAULT_MINES - countFlags(field);

  let messageText = '';
  const messageClasses = [styles.gameMessage];
  if (status === GAME_STATUS.WIN) {
    messageText = 'Перемога! Усі безпечні клітинки відкрито.';
    messageClasses.push(styles.isWin);
  } else if (status === GAME_STATUS.LOSE) {
    messageText = 'Гру завершено! Ви натрапили на міну.';
    messageClasses.push(styles.isLose);
  }

  return (
    <div className={styles.pageWrapper}>
      <main className={styles.minesweeperApp}>
        <div className={styles.frameInset}>
          <header className={styles.statusBar}>
            <CounterDisplay
              icon="🚩"
              value={remainingFlags}
              label="Залишилось прапорців"
              isLive
            />

            <RestartButton status={status} onRestart={handleRestart} />

            <CounterDisplay
              icon="⏱️"
              value={gameTime}
              label="Час гри у секундах"
            />
          </header>

          <div
            className={messageClasses.join(' ')}
            role="status"
            aria-live="polite"
          >
            {messageText}
          </div>

          <Board
            field={field}
            status={status}
            explodedCell={explodedCell}
            onOpenCell={handleOpenCell}
            onToggleFlag={handleToggleFlag}
          />
        </div>
      </main>
    </div>
  );
}