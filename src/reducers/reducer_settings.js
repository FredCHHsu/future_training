// import {FETCH_POSTS, FETCH_POST} from '../actions/index.js';

const initialState = { startDate: '2014/03/11',
                       endDate: '2014/03/11',
                       barPeroid: '1min',
                       barsPerSecond: 1,
                     };

export default function (state = initialState, action) {
  switch (action.type) {
    // case FETCH_POST:
    //   return { ...state, post: action.payload.data };
    // case FETCH_POSTS:
    //   return { ...state, all: action.payload.data };
    default:
      return state;
  }
}
