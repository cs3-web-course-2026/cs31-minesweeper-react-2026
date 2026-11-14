import styles from './MineCounter.module.css';

function MineCounter({ minesRemaining }) {
  return (
    <div className={styles.counter} aria-label="Mines remaining">
      <span aria-hidden="true">{'\u{1F6A9}'}</span>
      <span>{minesRemaining}</span>
    </div>
  );
}

export default MineCounter;