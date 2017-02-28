import { BUY, SHORT, SELL, COVER,
         SAVE_TRADE_LOG, RESET_TRADE_LOG,
         } from './types';

export function buy(tickInfo) {
  return { type: BUY, payload: tickInfo };
}

export function short(tickInfo) {
  return { type: SHORT, payload: tickInfo };
}

export function sell(tickInfo) {
  return { type: SELL, payload: tickInfo };
}

export function cover(tickInfo) {
  return { type: COVER, payload: tickInfo };
}

export function saveTradeLog() {
  return { type: SAVE_TRADE_LOG };
}

export function resetTradeLog() {
  return { type: RESET_TRADE_LOG };
}
