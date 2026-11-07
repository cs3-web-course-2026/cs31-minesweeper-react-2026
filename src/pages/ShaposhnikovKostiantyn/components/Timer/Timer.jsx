import { useEffect, useState } from 'react';
import styles from './Timer.module.css';

export default function Timer({ isRunning }) {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
  if (!isRunning) return undefined;

  const id = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, [isRunning]);

 return <span className={styles.timer}>{seconds}</span>;;
}
