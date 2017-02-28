import { GAME_TICK,
         FETCH_DATA,
         SET_START_DATE,
         ZOOM,
         MANUAL_TICK,
         } from '../actions/types.js';
import CHART_INITIAL_STATE from './chartInitialState';

const INITIAL_STATE = {
  ...CHART_INITIAL_STATE,
  startDate: null,
  data: null,
  dataOnChart: null,
  barsOnChart: 100,
  lastTickIndex: +localStorage.getItem('lastTickIndex') || 99,
  minDate: null,
  maxDate: null,
  durationBetweenBars: 1000,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_DATA: {
      const composedData = action.payload;
      const sliceEnd = state.lastTickIndex + 1;
      return { ...state,
        data: composedData,
        dataOnChart: composedData.slice(sliceEnd - state.barsOnChart, sliceEnd),
        startDate: composedData[state.lastTickIndex].date,
        minDate: composedData[0].date,
        maxDate: composedData[composedData.length - 1].date,
      };
    }
    case GAME_TICK: {
      const nextLastTickIndex = state.lastTickIndex + 1;
      const sliceEnd = nextLastTickIndex + 1;
      localStorage.setItem('lastTickIndex', nextLastTickIndex);
      return {
        ...state,
        lastTickIndex: nextLastTickIndex,
        dataOnChart: state.data.slice(
          (sliceEnd - state.barsOnChart), sliceEnd),
      };
    }
    case SET_START_DATE: {
      const lastTickIndex = state.data.findIndex(d =>
                              d.date.getTime() === action.payload.getTime());
      localStorage.setItem('lastTickIndex', lastTickIndex);
      const sliceEnd = lastTickIndex + 1;
      localStorage.setItem('lastTickIndex', lastTickIndex);
      return { ...state,
        startDate: action.payload,
        lastTickIndex,
        dataOnChart: state.data.slice((sliceEnd - state.barsOnChart), sliceEnd),
      };
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
      const sliceEnd = state.lastTickIndex + 1;
      return {
        ...state,
        barsOnChart,
        dataOnChart: state.data.slice((sliceEnd - barsOnChart), sliceEnd + 1),
      };
    }
    case MANUAL_TICK: {
      const shiftPerClick = 1;
      let lastTickIndex = state.lastTickIndex;
      let sliceEnd = lastTickIndex + 1;
      if (action.direction === 'back') {
        if (sliceEnd - state.barsOnChart - shiftPerClick < 0) {
          return state;
        }
        lastTickIndex -= shiftPerClick;
      } else if (action.direction === 'forward') {
        lastTickIndex += shiftPerClick;
      }
      sliceEnd = lastTickIndex + 1;
      localStorage.setItem('lastTickIndex', lastTickIndex);
      return {
        ...state,
        lastTickIndex,
        dataOnChart: state.data.slice((sliceEnd - state.barsOnChart), sliceEnd),
      };
    }
    default:
      return state;
  }
};
