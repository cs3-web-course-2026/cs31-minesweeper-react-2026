import { DIFFICULTY_CONFIG } from '../constants/game';

import styles from './DifficultySelector.module.css';

function DifficultySelector({ difficulty, onChange }) {
  return (
    <div
      className={styles.selector}
      role="group"
      aria-label="Рівень складності"
    >
      {Object.entries(DIFFICULTY_CONFIG).map(([difficultyId, config]) => (
        <button
          key={difficultyId}
          type="button"
          className={
            difficultyId === difficulty
              ? `${styles.option} ${styles.active}`
              : styles.option
          }
          aria-pressed={difficultyId === difficulty}
          onClick={() => onChange(difficultyId)}
        >
          <span className={styles.label}>{config.label}</span>
          <span className={styles.details}>
            {config.rows}×{config.cols} · {config.minesCount} 💣
          </span>
        </button>
      ))}
    </div>
  );
}

export default DifficultySelector;
