import { STATUS } from '../../constants';
import styles from './RestartButton.module.css';

const FACE_BY_STATUS = {
  [STATUS.PROCESS]: '🙂',
  [STATUS.WIN]: '😎',
  [STATUS.LOSE]: '😵',
};

export default function RestartButton({ status, onClick }) {
  return (
    <button className={styles.button} type="button" aria-label="Нова гра" onClick={onClick}>
      {FACE_BY_STATUS[status]}
    </button>
  );
}
