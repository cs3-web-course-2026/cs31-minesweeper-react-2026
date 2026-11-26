import { GAME_STATUS } from '../constants/game';

export default function GameStatus({ status, className }) {
  let message = '';
  if (status === GAME_STATUS.WIN) {
    message = 'Перемога! Всі безпечні клітинки знайдено.';
  } else if (status === GAME_STATUS.LOSE) {
    message = 'Поразка! Ви натрапили на міну.';
  }

  return (
    <div className={className} role="status" aria-live="polite">
      {message}
    </div>
  );
}