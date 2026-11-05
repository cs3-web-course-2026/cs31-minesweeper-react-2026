import { useCallback } from 'react';

import Board from './components/Board';
import FlagCounter from './components/FlagCounter';
import GameStatus from './components/GameStatus';
import RestartButton from './components/RestartButton';
import Timer from './components/Timer';
import { GAME_STATUS } from './constants/game';
import { useGameState } from './hooks/useGameState';
import { useTimer } from './hooks/useTimer';

import styles from './Game.module.css';


function TriaskovDanylo() {
  const {
    board,
    status,
    isRunning,
    remainingFlags,
    openCell,
    toggleFlag,
    startGame,
    restartGame,
  } = useGameState();

  const { gameTime, resetTimer } = useTimer(isRunning, status);

  const handleActionButtonClick = useCallback(() => {
    const isGameActiveOrEnded =
      isRunning ||
      status === GAME_STATUS.WIN ||
      status === GAME_STATUS.LOSE;

    if (isGameActiveOrEnded) {
      restartGame();
      resetTimer();
    } else {
      startGame();
    }
  }, [isRunning, status, restartGame, resetTimer, startGame]);

  return (
    <div className={styles.page}>
      <main className={styles.game}>
        <h1 className={styles.visuallyHidden}>Сапер</h1>

        <header className={styles.gameHeader}>
          <Timer gameTime={gameTime} />

          <RestartButton
            isRunning={isRunning}
            status={status}
            onAction={handleActionButtonClick}
          />

          <FlagCounter remainingFlags={remainingFlags} />
        </header>

        <Board
          board={board}
          status={status}
          onOpen={openCell}
          onFlag={toggleFlag}
        />

        <GameStatus status={status} />
      </main>
    </div>
  );
}


export default TriaskovDanylo;
