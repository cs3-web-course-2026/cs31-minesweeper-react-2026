import userImg from '../assets/user-image.jpg';
import styles from './RestartButton.module.css';

export default function RestartButton({ onRestart }) {
  return (
    <button
      type="button"
      className={styles.btnStart}
      aria-label="Почати нову гру"
      onClick={onRestart}
    >
      <img
        src={userImg}
        alt="Аватар користувача"
        className={styles.btnStartImg}
      />
    </button>
  );
}