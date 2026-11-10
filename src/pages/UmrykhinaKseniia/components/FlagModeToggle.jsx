import styles from './FlagModeToggle.module.css';

function FlagModeToggle({ isFlagMode, onToggle }) {
  return (
    <button
      type="button"
      className={styles.toggle}
      aria-pressed={isFlagMode}
      onClick={onToggle}
    >
      {isFlagMode ? 'Flag mode: on' : 'Flag mode: off'}
    </button>
  );
}

export default FlagModeToggle;