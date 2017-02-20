import { BUY, SHORT, SELL, COVER } from '../actions/types';

const INITIAL_STATE = {
  log: [],
  // { date: this.props.data[7].date, type: 'buy', price: this.props.data[7].low, quantity: 1000 },
  openInterest: 0,
  account: 1000000,
};

const POINT_VALUE = 50;

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case BUY:
    case SHORT:
    case SELL:
    case COVER:
      {
        const isBuyOrCover = action.type === BUY || action.type === COVER;
        const price = action.payload.close;
        const quantity = 1;
        const profit = POINT_VALUE * price * (isBuyOrCover ? -1 : 1);
        const log = state.log.slice(0);
        log.push({
          id: log.length + 1,
          type: action.type,
          date: action.payload.date,
          price,
          quantity,
          profit,
          open: action.payload.open,
          high: action.payload.high,
          low: action.payload.low,
          close: action.payload.close,
        });
        const openInterest = state.openInterest + (isBuyOrCover ? 1 : -1);
        const account = state.account + profit;
        return { ...state, log, openInterest, account };
      }
    default:
      return state;
  }
}
