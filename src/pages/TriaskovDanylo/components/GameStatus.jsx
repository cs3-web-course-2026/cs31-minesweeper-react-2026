import { memo } from 'react';

import { GAME_STATUS } from '../constants/game';

import styles from './GameStatus.module.css';


function getStatusDetails(status) {
  if (status === GAME_STATUS.WIN) {
    return {
      message: 'Перемога! Всі безпечні клітинки відкрито!',
      statusClassName: styles.gameMessageWin,
    };
  }

  if (status === GAME_STATUS.LOSE) {
    return {
      message: 'Поразка! Ви натрапили на міну.',
      statusClassName: styles.gameMessageLose,
    };
  }

  return {
    message: '',
    statusClassName: '',
  };
}


function GameStatus({ status }) {
  const { message, statusClassName } = getStatusDetails(status);
  const className = [styles.gameMessage, statusClassName]
    .filter(Boolean)
    .join(' ');

  return (
    <p
      className={className}
      role="status"
      aria-live="polite"
    >
      {message}
    </p>
  );
}


export default memo(GameStatus);
