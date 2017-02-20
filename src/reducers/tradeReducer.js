import { BUY, SHORT, SELL, COVER } from '../actions/types';

const INITIAL_STATE = {
  log: [],
  // { date: this.props.data[7].date, type: 'buy', price: this.props.data[7].low, quantity: 1000 },
  openInterest: 0,
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
          id: log.length + 1,
          type: action.type,
          date: action.payload.date,
          price: action.payload.close,
          quantity: 1,
          open: action.payload.open,
          high: action.payload.high,
          low: action.payload.low,
          close: action.payload.close,
          profit: '-',
        });
        const openInterest = state.openInterest +
                             (action.type === BUY || action.type === COVER ? 1 : -1);
        return { ...state, log, openInterest };
      }
    default:
      return state;
  }
}
