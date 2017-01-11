import axios from 'axios';

import { GAME_TICK, START_GAME, FETCH_DATA } from './types';

export const gameTick = () => ({
  type: GAME_TICK,
});

export const startGame = () => ({
  type: START_GAME,
});

export const fetchData = (url) => {
  const request = axios.get(url);
  return ({
    type: FETCH_DATA,
    payload: request,
  });
};
