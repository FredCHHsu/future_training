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
        const log = state.log.slice(0);
        log.push({
          type: action.type,
          date: action.payload.date,
          price: action.payload.close,
          quantity: 1,
          open: action.payload.open,
          hight: action.payload.high,
          low: action.payload.low,
          close: action.payload.close,
        });
        const position = state.position + (action.type === BUY || action.type === COVER ? 1 : -1);
        return { ...state, log, position };
      }
    default:
      return state;
  }
}
