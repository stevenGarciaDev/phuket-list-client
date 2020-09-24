import { createSelector } from 'reselect';

import { getCurrentUser } from './user.utilities';

const selectUser = state => state.user;

export const selectUserToken = createSelector(
    [selectUser],
    (user) => user.token
);

export const selectCurrentUser = createSelector(
    [selectUserToken],
    (token) => getCurrentUser(token)
);