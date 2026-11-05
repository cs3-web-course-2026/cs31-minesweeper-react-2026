import MineCounter from './MineCounter';
import RestartButton from './RestartButton';
import Timer from './Timer';

import styles from './GameHeader.module.css';

function GameHeader({ flagsLeft, elapsedSeconds, status, onRestart }) {
  return (
    <header className={styles.gameHeader}>
      <MineCounter flagsLeft={flagsLeft} />
      <RestartButton status={status} onRestart={onRestart} />
      <Timer seconds={elapsedSeconds} />
    </header>
  );
}

export default GameHeader;
