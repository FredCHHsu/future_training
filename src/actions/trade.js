import { BUY, SHORT, SELL, COVER } from './types';

export const buy = (tickInfo) => ({
  type: BUY,
  payload: tickInfo,
});

export const short = (tickInfo) => ({
  type: SHORT,
  payload: tickInfo,
});

export const sell = (tickInfo) => ({
  type: SELL,
  payload: tickInfo,
});

export const cover = (tickInfo) => ({
  type: COVER,
  payload: tickInfo,
});
