import Board from './components/Board/Board';
import GameHeader from './components/GameHeader/GameHeader';
import GameMessage from './components/GameMessage/GameMessage';
import Hint from './components/Hint/Hint';
import { useGame } from './hooks/useGame';
import { useTheme } from './hooks/useTheme';
import styles from './Minesweeper.module.css';

function Minesweeper() {
  const { theme, toggleTheme } = useTheme();
  const game = useGame();

  return (
    <div className={styles.page} data-theme={theme}>
      <div className={styles.sheet}>
        <GameHeader
          settings={game.settings}
          seconds={game.seconds}
          flagsCount={game.flagsCount}
          theme={theme}
          onToggleTheme={toggleTheme}
          onRestart={game.restart}
        />
        <main className={styles.main}>
          <Board
            board={game.board}
            cols={game.settings.cols}
            status={game.status}
            explodedCell={game.explodedCell}
            onOpen={game.openCell}
            onFlag={game.toggleFlag}
          />
          <GameMessage status={game.status} />
          <Hint />
        </main>
      </div>
    </div>
  );
}

export default Minesweeper;
