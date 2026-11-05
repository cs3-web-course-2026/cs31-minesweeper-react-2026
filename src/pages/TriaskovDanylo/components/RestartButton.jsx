import { memo } from 'react';

import { GAME_STATUS } from '../constants/game';

import styles from './RestartButton.module.css';


function RestartButton({ isRunning, status, onAction }) {
  const isRestartMode = isRunning || status !== GAME_STATUS.PROCESS;
  const buttonLabel = isRestartMode ? 'Рестарт' : 'Старт';

  return (
    <button
      className={styles.startButton}
      type="button"
      onClick={onAction}
    >
      {buttonLabel}
    </button>
  );
}


export default memo(RestartButton);
