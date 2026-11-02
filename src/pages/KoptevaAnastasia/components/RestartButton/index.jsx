import styles from './RestartButton.module.css';

function RestartButton({ onRestart, children }) {
  return (
    <button type="button" className={styles.restart} onClick={onRestart}>
      {children}
    </button>
  );
}

export default RestartButton;
