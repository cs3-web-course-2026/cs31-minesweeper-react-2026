import Badge from './Badge/Badge';
import styles from './Badge/Badge.module.css';

function FlagsCounter({ flags, total }) {
  return (
    <Badge icon="вљ‘" iconClassName={styles.danger}>
      Flags: {flags} / {total}
    </Badge>
  );
}

export default FlagsCounter;
