import { combineReducers } from 'redux';

import user_state from '../reducers/user';

const reducers = combineReducers({
	user: user_state
});

export default reducers;
