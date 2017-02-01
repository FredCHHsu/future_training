import { FETCH_DATA,
         START_GAME, PAUSE_GAME, GAME_TICK,
         SET_START_DATE,
       } from '../actions/types';

const initialState = {
  start: false,
  startDate: null,
  maxDate: null, // full data
  minDate: null, // full data
  // endDate: '2014/03/11',
  // barPeroid: '1min',
  durationBetweenBars: 1000,
  lastTickIndex: 99,
  barsOnChart: 100,
  data: null,
  dataOnChart: null,
};

export default function (state = initialState, action) {
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
    case START_GAME:
      // eslint-disable-next-line no-console
      console.log(START_GAME);
      return { ...state, start: true };
    case PAUSE_GAME:
      // eslint-disable-next-line no-console
      console.log(PAUSE_GAME);
      return { ...state, start: false };
    case GAME_TICK: {
      const nextLastTickIndex = state.lastTickIndex + 1;
      return {
        ...state,
        lastTickIndex: nextLastTickIndex,
        dataOnChart: state.data.slice((nextLastTickIndex + 1 - state.barsOnChart),
                                       nextLastTickIndex + 1),
      };
    }
    case SET_START_DATE: {
      const dataIsExist = state.data.findIndex(d => d.date.getTime() === action.payload.getTime());
      return { ...state, startDate: action.payload, lastTickIndex: dataIsExist };
    }
    default:
      return state;
  }
}
