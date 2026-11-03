import styles from './RestartButton.module.css';

function RestartButton({ onRestart }) {
  return (
    <button
      type="button"
      className={styles.button}
      aria-label="Нова гра"
      onClick={onRestart}
    >
      ❀
    </button>
  );
}

export default RestartButton;
