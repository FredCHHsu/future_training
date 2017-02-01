import { GAME_TICK, START_GAME, PAUSE_GAME, FETCH_DATA } from './types';
import axios from 'axios';
import * as d3 from 'd3';

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

const parseDate = d3.timeParse('%Y/%m/%d');
export function fetchData(url) {
  return dispatch => {
    axios.get(url).then(response =>
      dispatch({
        type: FETCH_DATA,
        payload: d3.csvParse(response.data).map(d => ({
          date: parseDate(d.date),
          open: +d.open,
          high: +d.high,
          low: +d.low,
          close: +d.close,
          volume: +d.volume,
        })).sort((a, b) => d3.ascending(a.date, b.date)),
      })
    );
  };
}
