import axios from 'axios';

export const GAME_TICK = 'GAME_TICK';
export const gameTick = () => ({
  type: GAME_TICK,
});

export const START_GAME = 'START_GAME';
export const startGame = () => ({
  type: START_GAME,
});

export const FETCH_DATA = 'FETCH_DATA';
export const fetchData = (url) => {
  const request = axios.get(url);
  return ({
    type: FETCH_DATA,
    payload: request,
  });
};
