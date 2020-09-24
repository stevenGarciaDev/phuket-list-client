import { combineReducers } from 'redux';

import userReducer from './user/user.reducer';
import bucketListReducer from './bucket-list/bucket-list.reducer';

export default combineReducers({
    user: userReducer,
    bucketList: bucketListReducer
});