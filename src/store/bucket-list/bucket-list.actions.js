import BucketListActions from './bucket-list.types';

export const addBucketListItem = item => ({
    type: BucketListActions.ADD_LIST_ITEM,
    payload: item
});

export const removeBucketListItem = id => ({
    type: BucketListActions.REMOVE_LIST_ITEM,
    payload: {
        id
    }
});

export const toggleBucketListItem = (item, status) => ({
    type: BucketListActions.TOGGLE_ITEM_COMPLETION_STATUS,
    payload: {
        item,
        status
    }
});
