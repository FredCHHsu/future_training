import { BUY, SHORT, SELL, COVER } from './types';

export function buy(tickInfo) {
  return {
    type: BUY,
    payload: tickInfo,
  };
}

export function short(tickInfo) {
  return {
    type: SHORT,
    payload: tickInfo,
  };
}

export function sell(tickInfo) {
  return {
    type: SELL,
    payload: tickInfo,
  };
}

export function cover(tickInfo) {
  return {
    type: COVER,
    payload: tickInfo,
  };
}
