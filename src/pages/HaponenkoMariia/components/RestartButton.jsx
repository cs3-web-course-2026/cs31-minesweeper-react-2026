import React from 'react';
import styles from './RestartButton.module.css';
import { GAME_STATUS } from '../constants/game';

import startImg from '../pictures/START.png';
import inProgressImg from '../pictures/inProgress.png';
import winImg from '../pictures/WIN.png';
import gameOverImg from '../pictures/GAMEOVER.png';

export default function RestartButton({ status, gameTime, onRestart }) {
  let btnImage = startImg;
  if (status === GAME_STATUS.WIN) btnImage = winImg;
  else if (status === GAME_STATUS.LOSE) btnImage = gameOverImg;
  else if (gameTime > 0) btnImage = inProgressImg;

  return (
    <button type="button" className={styles.startButton} onClick={onRestart}>
      <img src={btnImage} alt="Game status" className={styles.btnImg} />
    </button>
  );
}
