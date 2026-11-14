import { CELL_SYMBOL, FLAG_MODE_TEXT } from '../constants/ui';

import styles from './FlagModeToggle.module.css';

function FlagModeToggle({ isActive, onToggle }) {
  return (
    <button
      type="button"
      className={isActive ? `${styles.toggle} ${styles.active}` : styles.toggle}
      aria-pressed={isActive}
      onClick={onToggle}
    >
      {CELL_SYMBOL.FLAG}{' '}
      {isActive ? FLAG_MODE_TEXT.ACTIVE : FLAG_MODE_TEXT.INACTIVE}
    </button>
  );
}

export default FlagModeToggle;
