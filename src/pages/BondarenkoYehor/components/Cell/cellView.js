import { CELL_STATE, CELL_TYPE, GAME_STATUS, SYMBOLS } from '../../game/constants';

export function getCellView(cell, { status, isExploded }) {
  const gameOver = status !== GAME_STATUS.PROCESS;

  if (cell.state === CELL_STATE.OPENED) {
    return cell.neighborMines > 0
      ? {
          variants: ['open', `count${cell.neighborMines}`],
          symbol: String(cell.neighborMines),
          count: cell.neighborMines,
          label: `opened, ${cell.neighborMines} mines nearby`,
        }
      : { variants: ['open', 'empty'], symbol: '', label: 'opened, empty' };
  }

  if (cell.type === CELL_TYPE.MINE && gameOver) {
    if (isExploded) {
      return { variants: ['triggeredMine'], symbol: SYMBOLS.mine, label: 'exploded mine' };
    }
    if (cell.state === CELL_STATE.FLAGGED || status === GAME_STATUS.WIN) {
      return { variants: ['flaggedMine'], symbol: SYMBOLS.flag, label: 'flagged mine' };
    }
    return { variants: ['mine'], symbol: SYMBOLS.mine, label: 'mine' };
  }

  if (cell.state === CELL_STATE.FLAGGED) {
    const isWrong = status === GAME_STATUS.LOSE;
    return {
      variants: [isWrong ? 'wrongFlag' : 'flagged'],
      symbol: SYMBOLS.flag,
      label: isWrong ? 'wrong flag' : 'flagged',
    };
  }

  return { variants: ['closed'], symbol: '', label: 'closed' };
}
