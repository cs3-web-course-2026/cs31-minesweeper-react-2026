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

  // Спільний Layout уже надає єдиний main; гра є іменованою областю всередині.
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
      <details className={styles.controlsHelp}>
        <summary className={styles.helpSummary}>Керування</summary>
        <p className={styles.helpText}>
          {state.flagMode
            ? 'Лівий клац або дотик — прапорець. Вимкніть режим прапорця, щоб відкривати клітинки.'
            : 'Лівий клац або дотик — відкрити клітинку.'}{' '}
          Правий клац — прапорець.
          <br />
          Стрілки ↑ ↓ ← → — вибір клітинки; Enter або пробіл — відкрити
          незалежно від режиму; F — прапорець.
        </p>
      </details>
    </section>
  );
}
