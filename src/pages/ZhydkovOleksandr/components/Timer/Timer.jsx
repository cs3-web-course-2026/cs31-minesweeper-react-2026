import Counter, { formatCounter } from '../Counter/Counter';

export default function Timer({ seconds }) {
  return (
    <Counter icon="⏱" role="timer" label="Час гри, секунд">
      <time dateTime={`PT${seconds}S`}>{formatCounter(seconds)}</time>
    </Counter>
  );
}
