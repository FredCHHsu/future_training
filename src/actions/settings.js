import { SET_START_DATE } from './types';

export function setStartDate(date) {
  return {
    type: SET_START_DATE,
    payload: date,
  };
}
