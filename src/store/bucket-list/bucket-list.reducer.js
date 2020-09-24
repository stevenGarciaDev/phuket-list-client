import BucketListActions from './bucket-list.types';

const INITIAL_STATE = {
    bucketList: []
};

const BucketListReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case BucketListActions.ADD_LIST_ITEM:
            return {
                ...state,
                bucketList: [...state.bucketList, action.payload]
            }
        case BucketListActions.REMOVE_LIST_ITEM:
            return {
                ...state,
                bucketList: state.bucketList.filter(item => item._id !== action.payload.id)
            }
        default:
            return state;
    }
};

export default BucketListReducer;

