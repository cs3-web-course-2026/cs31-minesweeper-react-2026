import { useEffect, useState } from 'react';
import Board from './components/Board';
import CounterDisplay from './components/CounterDisplay';
import RestartButton from './components/RestartButton';
import {
  DEFAULT_COLS,
  DEFAULT_MINES,
  DEFAULT_ROWS,
  checkWinCondition,
  cloneField,
  countFlags,
  generateField,
  revealCells,
} from './utils/gameLogic';
import styles from './MinesweeperGame.module.css';

export default function MinesweeperGame() {
  const [field, setField] = useState(() =>
    generateField(DEFAULT_ROWS, DEFAULT_COLS, DEFAULT_MINES),
  );
  const [status, setStatus] = useState('process'); // 'process' | 'win' | 'lose'
  const [gameTime, setGameTime] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [explodedCell, setExplodedCell] = useState(null);

  useEffect(() => {
    if (!isTimerRunning || status !== 'process') {
      return undefined;
    }

    const timerId = setInterval(() => {
      setGameTime((prev) => Math.min(prev + 1, 999));
    }, 1000);

    return () => clearInterval(timerId);
  }, [isTimerRunning, status]);

  const handleOpenCell = (row, col) => {
    if (status !== 'process') {
      return;
    }

    const targetCell = field[row]?.[col];
    if (!targetCell || targetCell.state === 'opened' || targetCell.state === 'flagged') {
      return;
    }

    if (!isTimerRunning) {
      setIsTimerRunning(true);
    }

    const { nextField, hitMine } = revealCells(field, row, col);
    setField(nextField);

    if (hitMine) {
      setStatus('lose');
      setExplodedCell({ row, col });
      setIsTimerRunning(false);
      return;
    }

    if (checkWinCondition(nextField)) {
      setStatus('win');
      setIsTimerRunning(false);
    }
  };

  const handleToggleFlag = (row, col) => {
    if (status !== 'process') {
      return;
    }

    const targetCell = field[row]?.[col];
    if (!targetCell || targetCell.state === 'opened') {
      return;
    }

    if (!isTimerRunning) {
      setIsTimerRunning(true);
    }

    const nextField = cloneField(field);
    nextField[row][col].state =
      nextField[row][col].state === 'flagged' ? 'closed' : 'flagged';
    setField(nextField);
  };

  const handleRestart = () => {
    setField(generateField(DEFAULT_ROWS, DEFAULT_COLS, DEFAULT_MINES));
    setStatus('process');
    setGameTime(0);
    setIsTimerRunning(false);
    setExplodedCell(null);
  };

  const remainingFlags = DEFAULT_MINES - countFlags(field);

  let messageText = '';
  const messageClasses = [styles.gameMessage];
  if (status === 'win') {
    messageText = 'Перемога! Усі безпечні клітинки відкрито.';
    messageClasses.push(styles.isWin);
  } else if (status === 'lose') {
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