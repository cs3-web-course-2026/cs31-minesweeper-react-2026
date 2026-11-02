import FlagCounter from '../FlagCounter';
import RestartButton from '../RestartButton';
import Timer from '../Timer';
import { GAME_STATUS } from '../../gameLogic';
import styles from './GameHeader.module.css';

function GameHeader({ flagsLeft, seconds, status, onRestart }) {
  return (
    <header className={styles.header}>
      <FlagCounter flagsLeft={flagsLeft} />
      <RestartButton onRestart={onRestart}>
        {status === GAME_STATUS.IDLE ? 'Start' : 'Restart'}
      </RestartButton>
      <Timer seconds={seconds} />
    </header>
  );
}

export default GameHeader;
