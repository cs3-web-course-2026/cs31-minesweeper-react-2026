import { useEffect, useState } from 'react';
import styles from './Timer.module.css';

export const TIMER_INTERVAL_MS = 1000;

export default function Timer({ isRunning }) {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (!isRunning) return undefined;

    const id = setInterval(
      () => setSeconds((previousSeconds) => previousSeconds + 1),
      TIMER_INTERVAL_MS,
    );
    return () => clearInterval(id);
  }, [isRunning]);

  return <span className={styles.timer}>{seconds}</span>;
}

