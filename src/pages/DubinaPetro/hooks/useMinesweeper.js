import { useCallback, useEffect, useState } from 'react';

import { COLS, GAME_STATUS, MINES_COUNT, ROWS } from '../constants';
import {
  generateBoard,
  getFlagsCount,
  hasWon,
  revealCells,
  revealMines,
  toggleCellFlag,
} from '../utils/gameLogic';

export function useMinesweeper() {
  const [game, setGame] = useState(() => ({
    board: generateBoard(),
    status: GAME_STATUS.PROCESS,
    gameTime: 0,
    explodedCell: null,
  }));

  useEffect(() => {
    if (game.status !== GAME_STATUS.PROCESS) {
      return undefined;
    }

    const timerId = window.setInterval(() => {
      setGame((previousGame) => {
        if (previousGame.status !== GAME_STATUS.PROCESS) {
          return previousGame;
        }

        return {
          ...previousGame,
          gameTime: previousGame.gameTime + 1,
        };
      });
    }, 1000);

    return () => window.clearInterval(timerId);
  }, [game.status]);

  const restartGame = useCallback(() => {
    setGame({
      board: generateBoard(),
      status: GAME_STATUS.PROCESS,
      gameTime: 0,
      explodedCell: null,
    });
  }, []);

  const openCell = useCallback((row, col) => {
    setGame((previousGame) => {
      if (previousGame.status !== GAME_STATUS.PROCESS) {
        return previousGame;
      }

      const cell = previousGame.board[row][col];

      if (cell.state !== 'closed') {
        return previousGame;
      }

      if (cell.type === 'mine') {
        return {
          ...previousGame,
          board: revealMines(previousGame.board),
          status: GAME_STATUS.LOSE,
          explodedCell: { row, col },
        };
      }

      const nextBoard = revealCells(previousGame.board, row, col);

      return {
        ...previousGame,
        board: nextBoard,
        status: hasWon(nextBoard) ? GAME_STATUS.WIN : GAME_STATUS.PROCESS,
      };
    });
  }, []);

  const toggleFlag = useCallback((row, col) => {
    setGame((previousGame) => {
      if (previousGame.status !== GAME_STATUS.PROCESS) {
        return previousGame;
      }

      return {
        ...previousGame,
        board: toggleCellFlag(previousGame.board, row, col),
      };
    });
  }, []);

  return {
    board: game.board,
    flagsLeft: MINES_COUNT - getFlagsCount(game.board),
    gameTime: game.gameTime,
    explodedCell: game.explodedCell,
    restartGame,
    rows: ROWS,
    cols: COLS,
    minesCount: MINES_COUNT,
    openCell,
    status: game.status,
    toggleFlag,
  };
}
