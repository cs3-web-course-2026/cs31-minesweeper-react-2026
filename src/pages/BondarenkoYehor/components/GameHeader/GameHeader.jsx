import FlagsCounter from '../FlagsCounter';
import IconButton from '../IconButton/IconButton';
import RestartButton from '../RestartButton/RestartButton';
import Timer from '../Timer';
import styles from './GameHeader.module.css';

function GameHeader({ settings, seconds, flagsCount, theme, onToggleTheme, onRestart }) {
  const { rows, cols, minesCount } = settings;
  const isDark = theme === 'dark';

  return (
    <header className={styles.header}>
      <h1 className={styles.title}>
        Minesweeper
        <span className={styles.info}>
          {rows} &times; {cols} grid &middot; {minesCount} mines
        </span>
      </h1>
      <div className={styles.controls}>
        <Timer seconds={seconds} />
        <FlagsCounter flags={flagsCount} total={minesCount} />
        <IconButton
          label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
          onClick={onToggleTheme}
        >
          {isDark ? '\u2600' : '\u263E'}
        </IconButton>
        <RestartButton onRestart={onRestart} />
      </div>
    </header>
  );
}

export default GameHeader;
