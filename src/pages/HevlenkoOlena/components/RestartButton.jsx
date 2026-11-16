import styles from './RestartButton.module.css';

const STATUS_FACES = {
  process: '🙂',
  win: '😎',
  lose: '😵',
};

export default function RestartButton({ status, onRestart }) {
  return (
    <button
      type="button"
      className={styles.faceBtn}
      onClick={onRestart}
      aria-label="Почати нову гру"
    >
      {STATUS_FACES[status] ?? '🙂'}
    </button>
  );
}