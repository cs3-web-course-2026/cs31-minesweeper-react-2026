import styles from './RestartButton.module.css';

export default function RestartButton({ onRestart }) {
  return (
    <button
      type="button"
      className={styles.restartButton}
      onClick={onRestart}
      aria-label="почати нову гру"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z" />
      </svg>
    </button>
  );
}
