import { useEffect, useState } from 'react';
import { TIMER_INTERVAL } from '../constants';
import Indicator from './Indicator';

/**
 * Рахує секунди, поки гра триває. Скидається через зміну key у батька.
 * @param {Object} props Властивості компонента.
 * @param {boolean} props.isRunning Чи має таймер іти зараз.
 * @returns {JSX.Element} Індикатор часу.
 */
function Timer({ isRunning }) {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (!isRunning) {

      return undefined;
    }

    const timerId = setInterval(() => setSeconds(previous => previous + 1), TIMER_INTERVAL);

    return () => clearInterval(timerId);
  }, [isRunning]);

  return <Indicator icon="⏱" label="Час" value={seconds} variant="time" />;
}

export default Timer;
