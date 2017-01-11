import { BUY, SHORT, SELL, COVER } from '../actions/types';

const INITIAL_STATE = {
  log: [],
  // { date: this.props.data[7].date, type: 'buy', price: this.props.data[7].low, quantity: 1000 },
  position: 0,
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case BUY:
    case SHORT:
    case SELL:
    case COVER:
      {
        console.log(action.type);
        const log = state.log.slice(0);
        log.push({
          type: action.type,
          date: action.payload.date,
          price: action.payload.close,
          quantity: 1,
        });
        return { ...state, log };
      }
    default:
      return state;
  }
}
