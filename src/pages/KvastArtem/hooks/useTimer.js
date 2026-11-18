import { useEffect } from 'react';

import { GAME_ACTION, GAME_STATUS, TIMER_INTERVAL_MS } from '../constants/game';

export default function useTimer(status, roundId, dispatch) {
  useEffect(() => {
    if (status !== GAME_STATUS.PLAYING) {
      return undefined;
    }

    const timerId = setInterval(() => {
      dispatch({ type: GAME_ACTION.TICK, roundId });
    }, TIMER_INTERVAL_MS);

    return () => clearInterval(timerId);
  }, [status, roundId, dispatch]);
}
