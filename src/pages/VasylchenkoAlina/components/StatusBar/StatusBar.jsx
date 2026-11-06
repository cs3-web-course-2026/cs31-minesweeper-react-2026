import RestartButton from '../RestartButton/RestartButton';
import StatusBadge from '../StatusBadge/StatusBadge';
import styles from './StatusBar.module.css';

function StatusBar({ flagsLeft, seconds, onRestart }) {
  return (
    <header className={styles.statusBar}>
      <StatusBadge icon="⚑" value={flagsLeft} label="Залишилось прапорців" />
      <RestartButton onRestart={onRestart} />
      {/* aria-live="off": інакше таймер озвучувався б щосекунди */}
      <StatusBadge icon="⏱" value={seconds} label="Таймер" live="off" align="end" />
    </header>
  );
}

export default StatusBar;
