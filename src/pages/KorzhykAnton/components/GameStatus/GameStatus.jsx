import { STATUS } from '../../constants';
import styles from './GameStatus.module.css';

const MESSAGES = {
  [STATUS.WIN]: 'Перемога! Усі міни знешкоджено.',
  [STATUS.LOSE]: 'Бум! Ви натрапили на міну.',
};

export default function GameStatus({ status }) {
  return (
    <p className={`${styles.status} ${styles[status] ?? ''}`} role="status" aria-live="polite">
      {MESSAGES[status] ?? ''}
    </p>
  );
}
