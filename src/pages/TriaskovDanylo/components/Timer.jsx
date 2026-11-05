import { memo } from 'react';

import { formatCounterValue } from '../utils/format';

import styles from './Indicator.module.css';


function Timer({ gameTime }) {
  return (
    <p className={styles.indicator}>
      <span className={styles.indicatorLabel}>Час</span>
      <time
        className={styles.indicatorValue}
        dateTime={`PT${gameTime}S`}
      >
        {formatCounterValue(gameTime)}
      </time>
    </p>
  );
}


export default memo(Timer);
