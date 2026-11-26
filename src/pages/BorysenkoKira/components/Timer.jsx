export default function Timer({ value, label, className, isLive = false }) {
  return (
    <div
      className={className}
      aria-label={label}
      {...(isLive ? { role: 'status', 'aria-live': 'polite' } : {})}
    >
      {String(value).padStart(3, '0')}
    </div>
  );
}