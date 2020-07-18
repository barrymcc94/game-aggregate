import * as types from '../../types';
import {defaultLimit} from '../../../config';

const initialState = {
    ids: [],
    byId: {},
    isFetching: false,
    error: false,
    meta: {
        offset: 0,
        limit: defaultLimit,
        total: -1,
        filters: {}
    }
};

export const companies = (state=initialState, action={type: null, payload: null}) => {
    const {type, payload} = action;
    switch (type) {
        case types.FETCH_COMPANY_SUCCEEDED:
            return {
                ...state,
                byId: {
                    ...state.byId,
                    [payload.data.guid]: payload.data
                }
            };
        default:
            return state;
    }
}