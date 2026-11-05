import { memo } from 'react';

import { formatCounterValue } from '../utils/format';

import styles from './Indicator.module.css';


function FlagCounter({ remainingFlags }) {
  const containerClassName = [styles.indicator, styles.indicatorFlags]
    .filter(Boolean)
    .join(' ');

  return (
    <p className={containerClassName}>
      <span className={styles.indicatorLabel}>Прапорці</span>
      <span className={styles.indicatorValue}>
        {formatCounterValue(remainingFlags)}
      </span>
    </p>
  );
}


export default memo(FlagCounter);
