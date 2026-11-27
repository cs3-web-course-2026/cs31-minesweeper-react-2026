import styles from './ResultIndicator.module.css';

function ResultIndicator({ className, isActive, label }) {
  const classNames = [styles.indicator, className];

  if (isActive) {
    classNames.push(styles.active);
  }

  return <div className={classNames.filter(Boolean).join(' ')} aria-hidden="true">{label}</div>;
}

export default ResultIndicator;
