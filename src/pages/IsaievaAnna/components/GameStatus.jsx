import { GAME_STATUS } from '../constants/game';

const STATUS_MESSAGES = {
  [GAME_STATUS.IDLE]: 'Ready to play!',
  [GAME_STATUS.PLAYING]: 'Playing...',
  [GAME_STATUS.WON]: 'You won! 🎉',
  [GAME_STATUS.LOST]: 'Game over! 💥',
};

function GameStatus({ gameStatus }) {
  return (
    <p role="status" aria-live="polite" aria-atomic="true">
      {STATUS_MESSAGES[gameStatus]}
    </p>
  );
}

export default GameStatus;
