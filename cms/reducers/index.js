import { combineReducers } from 'redux';

import ui from './UiReducer';
import api from './ApiReducer';

export default combineReducers({
	ui,
	api
});
