import styles from './ControlButtons.module.css';

export function ControlButtons({
  isGameRunning,
  onStart,
  onStop,
}) {
  return (
    <div className={styles.controlsContainer}>
      <button
        type="button"
        className={styles.startButton}
        onClick={onStart}
        disabled={isGameRunning}
      >
        Start
      </button>
      <button
        type="button"
        className={styles.stopButton}
        onClick={onStop}
        disabled={!isGameRunning}
      >
        Stop
      </button>
    </div>
  );
}
