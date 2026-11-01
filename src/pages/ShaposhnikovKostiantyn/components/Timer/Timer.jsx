import { useEffect, useState } from 'react';
import { STATUS } from '../../gameLogic';
import styles from './Timer.module.css';

export default function Timer({ status }) {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (status === STATUS.IDLE) {
      setSeconds(0);
      return undefined;
    }
    if (status !== STATUS.PLAYING) return undefined; // гру завершено — таймер зупиняється

    const id = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(id); // очищення інтервалу при зміні статусу / розмонтуванні
  }, [status]);

  return <span className={styles.timer}>⏱ {String(seconds).padStart(3, '0')}</span>;
}
