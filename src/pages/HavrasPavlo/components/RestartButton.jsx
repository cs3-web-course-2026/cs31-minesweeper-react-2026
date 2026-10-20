import { memo } from 'react';

import { GAME_STATUS } from '../constants/game';

import styles from './RestartButton.module.css';


function getSmileyFace(gameStatus) {
  if (gameStatus === GAME_STATUS.WON) {
    return '😎';
  }

  if (gameStatus === GAME_STATUS.LOST) {
    return '😵';
  }

  return '😊';
}


function RestartButton({ gameStatus, onRestart }) {
  return (
    <button
      type="button"
      className={styles.restartButton}
      onClick={onRestart}
      aria-label="Почати нову гру"
    >
      <span className={styles.restartFace} aria-hidden="true">
        {getSmileyFace(gameStatus)}
      </span>
    </button>
  );
}


export default memo(RestartButton);
