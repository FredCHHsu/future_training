import { START_GAME, GAME_TICK } from '../actions/index';

const initialState = {
  start: false,
  startDate: '2014/03/11',
  endDate: '2014/03/11',
  barPeroid: '1min',
  barsPerSecond: 1,
  time: 0,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case START_GAME:
      // eslint-disable-next-line no-console
      console.log(START_GAME);
      return { ...state, start: true };
    case GAME_TICK:
      return { ...state, time: state.time + 1 };
    default:
      return state;
  }
}
