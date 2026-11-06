import styles from './RestartButton.module.css';

function RestartButton({ onRestart }) {
  return (
    <button
      type="button"
      className={styles.restartButton}
      aria-label="Restart game"
      onClick={onRestart}
    >
      🔄
    </button>
  );
}

export default RestartButton;
