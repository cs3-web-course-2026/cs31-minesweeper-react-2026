import Counter, { formatCounter } from '../Counter/Counter';

export default function FlagsCounter({ value }) {
  return (
    <Counter icon="🚩" role="status" label="Залишилось прапорців">
      <span>{formatCounter(value)}</span>
    </Counter>
  );
}
