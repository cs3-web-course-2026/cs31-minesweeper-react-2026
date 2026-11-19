import Counter from '../Counter/Counter';
import { formatCounter } from '../../formatCounter';

export default function Timer({ seconds }) {
  return (
    <Counter icon="⏱" role="timer" label="Час гри, секунд">
      <time dateTime={`PT${seconds}S`}>{formatCounter(seconds)}</time>
    </Counter>
  );
}
