import { useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

import { DEFAULT_CONFIG } from './constants/game';
import { useGameState } from './hooks/useGameState';
import { useTimer } from './hooks/useTimer';
import Board from './components/Board';
import MineCounter from './components/MineCounter';
import RestartButton from './components/RestartButton';
import Timer from './components/Timer';
import GameStatus from './components/GameStatus';

import styles from './Game.module.css';


const MAX_MINES = DEFAULT_CONFIG.rows * DEFAULT_CONFIG.cols - 1;


function HavrasPavloGame({ gameConfig }) {
  const {
    board,
    gameStatus,
    flagsCount,
    config,
    revealCell,
    toggleFlag,
    restartGame,
  } = useGameState(gameConfig);

  const { elapsedSeconds, resetTimer } = useTimer(gameStatus);

  const handleRestart = useCallback(() => {
    restartGame();
    resetTimer();
  }, [restartGame, resetTimer]);

  const remainingMines = config.mineCount - flagsCount;

  return (
    <main className={styles.game}>
      <div className={styles.gameContainer}>
        <header className={styles.statusBar}>
          <MineCounter remainingCount={remainingMines} />
          <RestartButton gameStatus={gameStatus} onRestart={handleRestart} />
          <Timer seconds={elapsedSeconds} />
        </header>

        <Board
          board={board}
          onReveal={revealCell}
          onFlag={toggleFlag}
        />

        <GameStatus gameStatus={gameStatus} />
      </div>
    </main>
  );
}


function HavrasPavlo() {
  const [searchParams] = useSearchParams();
  const customMines = searchParams.get('mines');

  const gameConfig = useMemo(() => {
    const parsedMines = Number.parseInt(customMines, 10);

    if (Number.isNaN(parsedMines) || parsedMines <= 0) {
      return DEFAULT_CONFIG;
    }

    return { ...DEFAULT_CONFIG, mineCount: Math.min(parsedMines, MAX_MINES) };
  }, [customMines]);

  // key перестворює гру (і її стан), коли змінюється кількість мін у query-параметрі
  return <HavrasPavloGame key={gameConfig.mineCount} gameConfig={gameConfig} />;
}


export default HavrasPavlo;
