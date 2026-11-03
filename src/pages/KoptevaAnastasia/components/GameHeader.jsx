import FlagCounter from './FlagCounter';
import RestartButton from './RestartButton';
import Timer from './Timer';

import styles from './GameHeader.module.css';

function GameHeader({ flagsLeft, seconds, onRestart }) {
  return (
    <header className={styles.header}>
      <FlagCounter flagsLeft={flagsLeft} />
      <RestartButton onRestart={onRestart}>New game</RestartButton>
      <Timer seconds={seconds} />
    </header>
  );
}

export default GameHeader;
