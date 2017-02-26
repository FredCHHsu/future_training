import { START_GAME, PAUSE_GAME,
       } from '../actions/types';

const initialState = {
  start: false,
};

export default function (state = initialState, action) {
  switch (action.type) {

    case START_GAME:
      // eslint-disable-next-line no-console
      console.log(START_GAME);
      return { ...state, start: true };
    case PAUSE_GAME:
      // eslint-disable-next-line no-console
      console.log(PAUSE_GAME);
      return { ...state, start: false };

    default:
      return state;
  }
}
