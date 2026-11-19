import Counter from '../Counter/Counter';
import { formatCounter } from '../../formatCounter';

export default function FlagsCounter({ value }) {
  return (
    <Counter icon="🚩" role="status" label="Залишилось прапорців">
      <span>{formatCounter(value)}</span>
    </Counter>
  );
}
