import { BUY, SHORT, SELL, COVER } from '../actions/types';

const INITIAL_STATE = {
  log: [],
  position: 0,
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
        const bar = action.payload;
        const isBuyOrCover = action.type === BUY || action.type === COVER;
        const openContract = action.type === BUY || action.type === SHORT;
        const price = bar.close;
        const quantity = 1;
        const contractValue = POINT_VALUE * price * (isBuyOrCover ? -1 : 1);
        const log = state.log.slice(0);
        log.push({
          id: log.length + 1,
          type: action.type,
          date: bar.date,
          price,
          quantity,
          contractValue,
          open: bar.open,
          high: bar.high,
          low: bar.low,
          close: bar.close,
          openContract,
        });
        const position = state.position + (isBuyOrCover ? 1 : -1);
        const account = state.account + contractValue;
        return { ...state, log, position, account };
      }
    default:
      return state;
  }
}
