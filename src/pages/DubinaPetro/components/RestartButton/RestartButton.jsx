import { GAME_STATUS } from '../../constants';
import loseFace from '../../assets/loseity.png';
import processFace from '../../assets/verity.png';
import winFace from '../../assets/winity.png';
import styles from './RestartButton.module.css';

const FACE_BY_STATUS = {
  [GAME_STATUS.PROCESS]: processFace,
  [GAME_STATUS.WIN]: winFace,
  [GAME_STATUS.LOSE]: loseFace,
};

function RestartButton({ className, onRestart, status }) {
  return (
    <button
      type="button"
      className={[styles.button, className].filter(Boolean).join(' ')}
      aria-label="Start a new game"
      onClick={onRestart}
    >
      <img className={styles.face} src={FACE_BY_STATUS[status]} alt="" />
    </button>
  );
}

export default RestartButton;
