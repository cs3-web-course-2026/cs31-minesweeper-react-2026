import { STATUS_FACE } from '../constants/ui';

import styles from './RestartButton.module.css';

function RestartButton({ status, onRestart }) {
  return (
    <button
      type="button"
      className={styles.restartButton}
      aria-label="Почати нову гру"
      onClick={onRestart}
    >
      {STATUS_FACE[status]}
    </button>
  );
}

export default RestartButton;
