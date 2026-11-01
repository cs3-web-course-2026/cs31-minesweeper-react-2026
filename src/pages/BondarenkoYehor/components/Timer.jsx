import Badge from './Badge/Badge';

function Timer({ seconds }) {
  return <Badge icon="вЏ±">Time: {String(seconds).padStart(3, '0')}</Badge>;
}

export default Timer;
