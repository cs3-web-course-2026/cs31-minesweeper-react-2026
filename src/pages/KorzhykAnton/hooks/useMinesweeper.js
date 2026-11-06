import { useCallback, useEffect, useReducer } from 'react';
import { STATUS } from '../constants';
import { countFlags, generateField, isWin, openCell, toggleFlag } from '../logic/minesweeper';

const ACTION = {
  NEW_GAME: 'NEW_GAME',
  OPEN_CELL: 'OPEN_CELL',
  TOGGLE_FLAG: 'TOGGLE_FLAG',
  TICK: 'TICK',
};

function createInitialState({ rows, cols, minesCount }) {
  return {
    config: { rows, cols, minesCount },
    field: generateField(rows, cols, minesCount),
    status: STATUS.PROCESS,
    gameTime: 0,
    isStarted: false,
    explodedCell: null,
  };
}

function getStatusAfterOpen(field, isMine) {
  if (isMine) return STATUS.LOSE;
  if (isWin(field)) return STATUS.WIN;
  return STATUS.PROCESS;
}

function reducer(state, action) {
  switch (action.type) {
    case ACTION.NEW_GAME:
      return createInitialState(state.config);

    case ACTION.TICK:
      return { ...state, gameTime: state.gameTime + 1 };

    case ACTION.OPEN_CELL: {
      if (state.status !== STATUS.PROCESS) return state;

      const { row, col } = action;
      const { field, isMine } = openCell(state.field, row, col);
      if (field === state.field) return state;

      return {
        ...state,
        field,
        isStarted: true,
        status: getStatusAfterOpen(field, isMine),
        explodedCell: isMine ? { row, col } : null,
      };
    }

    case ACTION.TOGGLE_FLAG: {
      if (state.status !== STATUS.PROCESS) return state;

      const field = toggleFlag(state.field, action.row, action.col);
      return field === state.field ? state : { ...state, field };
    }

    default:
      return state;
  }
}

export function useMinesweeper(config) {
  const [state, dispatch] = useReducer(reducer, config, createInitialState);
  const { field, status, gameTime, isStarted, explodedCell } = state;

  const isTimerRunning = isStarted && status === STATUS.PROCESS;

  useEffect(() => {
    if (!isTimerRunning) return undefined;

    const timerId = setInterval(() => dispatch({ type: ACTION.TICK }), 1000);
    return () => clearInterval(timerId);
  }, [isTimerRunning]);

  const handleOpen = useCallback((row, col) => dispatch({ type: ACTION.OPEN_CELL, row, col }), []);
  const handleFlag = useCallback((row, col) => dispatch({ type: ACTION.TOGGLE_FLAG, row, col }), []);
  const restart = useCallback(() => dispatch({ type: ACTION.NEW_GAME }), []);

  return {
    field,
    status,
    gameTime,
    explodedCell,
    flagsLeft: config.minesCount - countFlags(field),
    handleOpen,
    handleFlag,
    restart,
  };
}
