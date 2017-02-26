import { GAME_TICK,
         FETCH_DATA,
         SET_START_DATE,
         ZOOM,
         } from '../actions/types.js';
import CHART_INITIAL_STATE from './chartInitialState';

const INITIAL_STATE = {
  ...CHART_INITIAL_STATE,
  startDate: null,
  data: null,
  dataOnChart: null,
  barsOnChart: 100,
  lastTickIndex: 99,
  minDate: null,
  maxDate: null,
  durationBetweenBars: 1000,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_DATA: {
      const composedData = action.payload;
      return { ...state,
        data: composedData,
        dataOnChart: composedData.slice(0, state.lastTickIndex + 1),
        startDate: composedData[state.lastTickIndex].date,
        minDate: composedData[0].date,
        maxDate: composedData[composedData.length - 1].date,
      };
    }
    case GAME_TICK: {
      const nextLastTickIndex = state.lastTickIndex + 1;
      return {
        ...state,
        lastTickIndex: nextLastTickIndex,
        dataOnChart: state.data.slice(
          (nextLastTickIndex + 1 - state.barsOnChart), nextLastTickIndex + 1),
      };
    }
    case SET_START_DATE: {
      const dataIsExist = state.data.findIndex(d => d.date.getTime() === action.payload.getTime());
      return { ...state, startDate: action.payload, lastTickIndex: dataIsExist };
    }
    case ZOOM: {
      let barsOnChart = state.barsOnChart;
      if (action.zoomType === 'in') {
        if (barsOnChart === 10) return state;
        barsOnChart -= 10;
      } else if (action.zoomType === 'out') {
        if (state.lastTickIndex - barsOnChart <= 0 || barsOnChart >= 300) return state;
        barsOnChart += 10;
      }
      return {
        ...state,
        barsOnChart,
        dataOnChart: state.data.slice(
          (state.lastTickIndex + 1 - barsOnChart), state.lastTickIndex),
      };
    }
    default:
      return state;
  }
};
