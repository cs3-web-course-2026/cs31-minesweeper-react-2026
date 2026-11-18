import { GAME_STATUS, STATUS_MESSAGES } from '../constants/game';

import styles from './GameStatus.module.css';

export default function GameStatus({ status }) {
  const classes = [
    styles.message,
    status === GAME_STATUS.WON && styles.won,
    status === GAME_STATUS.LOST && styles.lost,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <p className={classes} role="status" aria-live="polite" aria-atomic="true">
      {STATUS_MESSAGES[status]}
    </p>
  );
}
