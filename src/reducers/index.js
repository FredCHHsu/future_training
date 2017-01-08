import { combineReducers } from 'redux';
import game from './reducer_game';
import chart from './reducer_chart';

const Reducers = combineReducers({
  game,
  chart,
});

export default Reducers;
