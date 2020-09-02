import { combineReducers } from 'redux';

import user_state from '../reducers/user';
import directory_state from '../reducers/directory';

const reducers = combineReducers({
	user: user_state,
	dir: directory_state
});

export default reducers;
