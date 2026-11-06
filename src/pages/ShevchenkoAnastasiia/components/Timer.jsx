import CounterDisplay from './CounterDisplay';

function Timer({ seconds }) {
  return (
    <CounterDisplay
      icon="⏱"
      label="Час гри, секунд"
      value={seconds}
      role="timer"
    />
  );
}

export default Timer;
