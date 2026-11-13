export default function Timer({ time }) {
  return <span>{String(time).padStart(3, '0')}</span>;
}
