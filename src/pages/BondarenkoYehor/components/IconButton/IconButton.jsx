import styles from './IconButton.module.css';

function IconButton({ label, onClick, children }) {
  return (
    <button type="button" className={styles.button} aria-label={label} onClick={onClick}>
      {children}
    </button>
  );
}

export default IconButton;
