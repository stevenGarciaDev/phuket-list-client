import { UserActionTypes } from './user.types';

export const setUserToken = token => ({
    type: UserActionTypes.SET_USER_TOKEN,
    payload: token
});