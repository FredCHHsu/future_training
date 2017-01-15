import axios from 'axios';

import { GAME_TICK, START_GAME, PAUSE_GAME, FETCH_DATA } from './types';

export function gameTick() {
  return {
    type: GAME_TICK,
  };
}

export function startGame() {
  return {
    type: START_GAME,
  };
}

export function pauseGame() {
  return {
    type: PAUSE_GAME,
  };
}

export function fetchData(url) {
  const request = axios.get(url);
  return ({
    type: FETCH_DATA,
    payload: request,
  });
}
