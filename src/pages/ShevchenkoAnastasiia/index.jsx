import { useState } from 'react';

import Board from './components/Board';
import DifficultySelector from './components/DifficultySelector';
import FlagModeToggle from './components/FlagModeToggle';
import GameHeader from './components/GameHeader';
import GameStatus from './components/GameStatus';
import { useGameState } from './hooks/useGameState';
import { useTimer } from './hooks/useTimer';
import { GAME_STATUS } from './constants/game';

import styles from './Game.module.css';

function Game() {
  const {
    board,
    status,
    difficulty,
    elapsedSeconds,
    flagsLeft,
    bestTime,
    updateElapsed,
    openCell,
    toggleCellFlag,
    restart,
    changeDifficulty,
  } = useGameState();

  const [isFlagMode, setIsFlagMode] = useState(false);

  useTimer(status === GAME_STATUS.PLAYING, updateElapsed);

  const handleCellSelect = isFlagMode ? toggleCellFlag : openCell;
  const handleFlagModeToggle = () => setIsFlagMode((isActive) => !isActive);

  return (
    <section
      className={styles.game}
      lang="uk"
      aria-labelledby="minesweeper-title"
    >
      <h1 id="minesweeper-title" className={styles.title}>
        Сапер
      </h1>

      <DifficultySelector difficulty={difficulty} onChange={changeDifficulty} />

      <GameHeader
        flagsLeft={flagsLeft}
        elapsedSeconds={elapsedSeconds}
        status={status}
        onRestart={restart}
      />

      <FlagModeToggle isActive={isFlagMode} onToggle={handleFlagModeToggle} />

      <Board
        board={board}
        status={status}
        onCellSelect={handleCellSelect}
        onCellFlag={toggleCellFlag}
      />

      <GameStatus status={status} bestTime={bestTime} />
    </section>
  );
}

export default Game;
