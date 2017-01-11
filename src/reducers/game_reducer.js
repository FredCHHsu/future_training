import { FETCH_DATA, START_GAME, GAME_TICK } from '../actions/types';
import * as d3 from 'd3';

const parseDate = d3.timeParse('%d-%b-%y');

const initialState = {
  start: false,
  startDate: '2014/03/11',
  endDate: '2014/03/11',
  barPeroid: '1min',
  durationBetweenBars: 1000,
  lastTickIndex: 99,
  data: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_DATA: {
      const composedData = d3.csvParse(action.payload.data).map(d => ({
        date: parseDate(d.Date),
        open: +d.Open,
        high: +d.High,
        low: +d.Low,
        close: +d.Close,
        volume: +d.Volume,
      })).sort((a, b) => d3.ascending(a.date, b.date));
      return { ...state, data: composedData };
    }
    case START_GAME:
      // eslint-disable-next-line no-console
      console.log(START_GAME);
      return { ...state, start: true };
    case GAME_TICK:
      return { ...state, lastTickIndex: state.lastTickIndex + 1 };
    default:
      return state;
  }
}
