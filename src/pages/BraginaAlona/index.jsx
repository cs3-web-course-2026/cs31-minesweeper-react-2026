import { useGameState } from './hooks/useGameState';
import { useTimer } from './hooks/useTimer';

import { GAME_CONFIG, GAME_STATUS } from './constants/game';

import { countFlags } from './utils/checks';

import Board from './components/Board';
import Timer from './components/Timer';
import GameStatus from './components/GameStatus';
import RestartButton from './components/RestartButton';

import styles from './Game.module.css';

function Minesweeper() {
  const {
    board,
    status,
    dispatch,
    restartGame,
  } = useGameState();

  const {
    formattedTime,
    resetTimer,
  } = useTimer(status);

  // Відкриття клітинки
  function handleReveal(row, col) {
    dispatch({
      type: 'REVEAL_CELL',
      row,
      col,
    });
  }

  // Встановлення або зняття прапорця
  function handleToggleFlag(row, col) {
    dispatch({
      type: 'TOGGLE_FLAG',
      row,
      col,
    });
  }

  // Перезапуск гри разом із таймером
  function handleRestart() {
    restartGame();
    resetTimer();
  }

  const flagsCount = countFlags(board);
  const remainingMines = GAME_CONFIG.MINE_COUNT - flagsCount;

  const isGameOver =
    status === GAME_STATUS.WON ||
    status === GAME_STATUS.LOST;

  return (
    <main className={styles.container}>
      <section className={styles.game}>
        <header className={styles.header}>
          <p className={styles.subtitle}>ЛАБОРАТОРНА РОБОТА №3</p>
          <h1 className={styles.title}>Minesweeper</h1>
          <p className={styles.description}>
            Класична гра «Сапер», створена за допомогою React
          </p>
        </header>

        <div className={styles.toolbar}>
          <div className={styles.counter}>
            <span>МІНИ</span>
            <strong>{String(remainingMines).padStart(3, '0')}</strong>
          </div>

          <Timer time={formattedTime} />

          <div className={styles.counter}>
            <span>ПРАПОРЦІ</span>
            <strong>{String(flagsCount).padStart(3, '0')}</strong>
          </div>
        </div>

        <GameStatus status={status} />

        <Board
          board={board}
          onReveal={handleReveal}
          onToggleFlag={handleToggleFlag}
          disabled={isGameOver}
        />

        <div className={styles.footer}>
          <RestartButton onRestart={handleRestart} />
          <p>Ліва кнопка — відкрити · Права кнопка — прапорець</p>
        </div>
      </section>
    </main>
  );
}

export default Minesweeper;