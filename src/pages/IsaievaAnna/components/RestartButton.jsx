import styles from './RestartButton.module.css';

function RestartButton({ onRestart }) {
  return (
    <button
      type="button"
      className={styles.restartButton}
      onClick={onRestart}
    >
      <span aria-hidden="true">↻</span>
      <span>New Game</span>
    </button>
  );
}

export default RestartButton;
