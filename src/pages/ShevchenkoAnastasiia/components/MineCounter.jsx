import CounterDisplay from './CounterDisplay';

function MineCounter({ flagsLeft }) {
  return (
    <CounterDisplay icon="🚩" label="Залишилось прапорців" value={flagsLeft} />
  );
}

export default MineCounter;
