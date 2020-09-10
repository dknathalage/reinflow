import {
	combineReducers
} from 'redux';

import user_state from '../reducers/user';
import directory_state from '../reducers/directory';
import manage_user from '../reducers/user/manage'

const reducers = combineReducers({
	user: user_state,
	dir: directory_state,
	manage: manage_user
});

export default reducers;