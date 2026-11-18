import { useId } from 'react';

import { GAME_CONFIG } from './constants/game';
import useGameState from './hooks/useGameState';
import Board from './components/Board';
import FlagCounter from './components/FlagCounter';
import GameStatus from './components/GameStatus';
import RestartButton from './components/RestartButton';
import Timer from './components/Timer';

import styles from './Game.module.css';

export default function KvastArtem() {
  const titleId = useId();
  const {
    state,
    remainingFlags,
    isFinished,
    reveal,
    flag,
    restart,
    toggleFlagMode,
  } = useGameState();

  return (
    <section className={styles.game} lang="uk" aria-labelledby={titleId}>
      <h1 className={styles.title} id={titleId}>
        Сапер
      </h1>
      <p className={styles.description}>
        {GAME_CONFIG.rows} × {GAME_CONFIG.cols} клітинок ·{' '}
        {GAME_CONFIG.minesCount} мін
      </p>
      <header className={styles.header}>
        <Timer seconds={state.elapsedSeconds} />
        <RestartButton status={state.status} onRestart={restart} />
        <FlagCounter remainingFlags={remainingFlags} />
      </header>
      <div className={styles.touchControls}>
        <button
          type="button"
          className={styles.modeButton}
          aria-pressed={state.flagMode}
          disabled={isFinished}
          onClick={toggleFlagMode}
        >
          <span aria-hidden="true">🚩 </span>
          Режим прапорця: {state.flagMode ? 'увімкнено' : 'вимкнено'}
        </button>
        <p className={styles.touchHint}>
          {state.flagMode
            ? 'Торкніться клітинки, щоб змінити прапорець.'
            : 'Торкніться клітинки, щоб відкрити її.'}
        </p>
      </div>
      <Board
        key={state.roundId}
        board={state.board}
        status={state.status}
        isFinished={isFinished}
        flagMode={state.flagMode}
        onReveal={reveal}
        onFlag={flag}
      />
      <GameStatus status={state.status} />
      <p className={styles.controlsHelp}>
        Лівий клік — відкрити. Правий клік — прапорець.
        <br />
        Стрілки ↑ ↓ ← → — вибір клітинки; Enter або пробіл — відкрити; F —
        прапорець.
      </p>
    </section>
  );
}
