import { ZOOM } from './types';

export function zoom(type) {
  console.log(`zoom: ${type}`);
  return {
    type: ZOOM,
    zoomType: type,
  };
}
