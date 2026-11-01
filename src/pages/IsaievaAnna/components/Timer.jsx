import { TIMER_CONFIG } from '../constants/game';

function Timer({ seconds }) {
  const formattedTime = String(seconds).padStart(
    TIMER_CONFIG.DISPLAY_DIGITS,
    '0',
  );

  return (
    <div aria-label={`Час гри: ${seconds} секунд`}>
      <time>{formattedTime}s</time>
    </div>
  );
}

export default Timer;
