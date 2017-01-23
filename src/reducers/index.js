import { combineReducers } from 'redux';
import game from './gameReducer';
import chart from './chartReducer';
import trade from './tradeReducer';

const Reducers = combineReducers({
  game,
  chart,
  trade,
});

export default Reducers;
