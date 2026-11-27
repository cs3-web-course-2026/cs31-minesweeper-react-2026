import React from 'react';
import MineCounter from './MineCounter';
import RestartButton from './RestartButton';
import Timer from './Timer';
import styles from './GameStatus.module.css';

export default function GameStatus({ minesLeft, gameTime, status, onRestart }) {
  return (
    <header className={styles.gameInfo}>
      <MineCounter count={minesLeft} />
      <RestartButton
        status={status}
        gameTime={gameTime}
        onRestart={onRestart}
      />
      <Timer time={gameTime} />
    </header>
  );
}
