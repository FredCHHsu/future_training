import { ZOOM, MANUAL_TICK } from './types';

export function zoom(zoomType) {
  return {
    type: ZOOM,
    zoomType,
  };
}

export function manualTick(direction) {
  return {
    type: MANUAL_TICK,
    direction,
  };
}
