import { DIFFICULTIES } from '../../gameLogic';
import styles from './DifficultySelect.module.css';

export default function DifficultySelect({ value, onChange }) {
  return (
    <label className={styles.label}>
      Складність:
      <select
        className={styles.select}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      >
        {Object.entries(DIFFICULTIES).map(([key, { label }]) => (
          <option key={key} value={key}>
            {label}
          </option>
        ))}
      </select>
    </label>
  );
}
