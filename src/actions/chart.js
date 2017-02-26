import { ZOOM } from './types';

export function zoom(type) {
  return {
    type: ZOOM,
    zoomType: type,
  };
}
