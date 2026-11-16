import React from 'react';
import styles from './RestartButton.module.css';
import { GAME_STATUS } from '../constants/game';

import startImg from '../pictures/START.png';
import inProgressImg from '../pictures/inProgress.png';
import winImg from '../pictures/WIN.png';
import gameOverImg from '../pictures/GAMEOVER.png';

export default function RestartButton({ gameStatus, gameTime, onRestart }) {
  let btnImage = startImg;
  let statusText = 'Game in progress';

  if (gameStatus === GAME_STATUS.WIN) {
    btnImage = winImg;
    statusText = 'You Won!';
  } else if (gameStatus === GAME_STATUS.LOSE) {
    btnImage = gameOverImg;
    statusText = 'Game Over!';
  } else if (gameTime > 0) {
    btnImage = inProgressImg;
  }

  return (
    <div className={styles.container}>
      <button
        type="button"
        className={styles.startButton}
        onClick={onRestart}
        aria-label="Restart game"
      >
        <img src={btnImage} alt="Game status" className={styles.btnImg} />
      </button>
      <span role="status" aria-live="polite" className={styles.srOnly}>
        {statusText}
      </span>
    </div>
  );
}
