import styles from './Hint.module.css';

function Hint() {
  return (
    <p className={styles.hint}>
      <kbd className={styles.key}>Left click</kbd> dig <span>&middot;</span>{' '}
      <kbd className={styles.key}>Right click</kbd> or <kbd className={styles.key}>F</kbd> flag
    </p>
  );
}

export default Hint;
