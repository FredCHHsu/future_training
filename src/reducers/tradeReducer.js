import { BUY, SHORT, SELL, COVER,
         SAVE_TRADE_LOG, RESET_TRADE_LOG,
        } from '../actions/types';

const RESET_STATE = {
  log: [],
  position: 0,
  account: 1000000,
};

const INITIAL_STATE = (() => {
  let log = [];
  if (localStorage.getItem('tradeLog')) {
    log = JSON.parse(localStorage.getItem('tradeLog'));
    log.forEach((trade, i) => { log[i].date = new Date(log[i].date); });
  }
  return {
    log,
    position: +localStorage.getItem('position') || 0,
    account: +localStorage.getItem('account') || 1000000,
  };
})();

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

        // auto save
        localStorage.setItem('tradeLog', JSON.stringify(log));
        localStorage.setItem('position', position);
        localStorage.setItem('account', account);
        return { ...state, log, position, account };
      }
    case SAVE_TRADE_LOG:
      localStorage.setItem('tradeLog', JSON.stringify(state.log));
      localStorage.setItem('position', state.position);
      localStorage.setItem('account', state.account);
      return state;
    case RESET_TRADE_LOG:
      localStorage.removeItem('tradeLog');
      localStorage.removeItem('position');
      localStorage.removeItem('account');
      return {
        ...RESET_STATE,
      };
    default:
      return state;
  }
}
