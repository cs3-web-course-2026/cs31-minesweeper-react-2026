import React from 'react';
import styles from './MineCounter.module.css';

export default function MineCounter({ count }) {
  return <div className={styles.counter}>{count}</div>;
}
