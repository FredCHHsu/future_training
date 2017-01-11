import { BUY, SHORT, SELL, COVER } from '../actions/types';

const INITIAL_STATE = {
  log: [],
  // { date: this.props.data[7].date, type: 'buy', price: this.props.data[7].low, quantity: 1000 },
  position: 0,
};

const arrowShift = 1;

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
          // price is the position drawing on chart
          price: action.type === BUY || action.type === COVER ?
                 action.payload.low - arrowShift : action.payload.high + arrowShift,
          realPrice: action.payload.close, // real trade price
          quantity: 1,
        });
        const position = state.position + (action.type === BUY || action.type === COVER ? 1 : -1);
        return { ...state, log, position };
      }
    default:
      return state;
  }
}
