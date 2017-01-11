import { combineReducers } from 'redux';
import game from './game_reducer';
import chart from './chart_reducer';
import trade from './trade_reducer';

const Reducers = combineReducers({
  game,
  chart,
  trade,
});

export default Reducers;
