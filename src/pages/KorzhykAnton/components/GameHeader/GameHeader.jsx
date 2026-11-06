import Counter from '../Counter/Counter';
import RestartButton from '../RestartButton/RestartButton';
import styles from './GameHeader.module.css';

export default function GameHeader({ flagsLeft, gameTime, status, onRestart }) {
  return (
    <header className={styles.header}>
      <Counter icon="🚩" value={flagsLeft} label="Залишилось прапорців" />
      <RestartButton status={status} onClick={onRestart} />
      <Counter icon="⏱" value={gameTime} label="Час гри, секунд" />
    </header>
  );
}
