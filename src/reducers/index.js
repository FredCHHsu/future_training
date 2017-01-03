import { combineReducers } from 'redux';
import GameSettingsReducer from './reducer_settings';

const Reducers = combineReducers({
  GameSettings: GameSettingsReducer,
});

export default Reducers;
