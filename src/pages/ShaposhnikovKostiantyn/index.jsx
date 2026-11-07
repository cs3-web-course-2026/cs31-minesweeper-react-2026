import Board from './components/Board/Board';
import DifficultySelect from './components/DifficultySelect/DifficultySelect';
import GameStatus from './components/GameStatus/GameStatus';
import RestartButton from './components/RestartButton/RestartButton';
import Timer from './components/Timer/Timer';
import useMinesweeper from './useMinesweeper';
import styles from './Minesweeper.module.css';
import {STATUS} from "./gameLogic.js";

export default function Minesweeper() {
  const { board, status, difficulty, gameId, minesLeft, reveal, flag, restart } =
      useMinesweeper();

  return (
  <div className={styles.page}>
    <header className={styles.panel}>
      {/* статус-бар: таймер, мины */}
      {/* управление: сложность, рестарт */}
    </header>

    <section className={styles.boardArea} aria-label="Ігрове поле">
      {/* <Board ... /> */}
    </section>
  </div>
  );
}
