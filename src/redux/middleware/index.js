import {defaultGbApiDefaults} from '../../config';
import {
    FETCH_GAMES_STARTED,
    FETCH_GAME_STARTED,
    FETCH_COMPANIES_STARTED,
    FETCH_COMPANY_STARTED,
    FETCH_FRANCHISES_STARTED,
    FETCH_FRANCHISE_STARTED,
} from '../types';

const gbAuthTypes = [
    FETCH_GAMES_STARTED,
    FETCH_GAME_STARTED,
    FETCH_COMPANIES_STARTED,
    FETCH_COMPANY_STARTED,
    FETCH_FRANCHISES_STARTED,
    FETCH_FRANCHISE_STARTED,
];

export const authMiddleware =
    ({getState}) =>
    (next) =>
    (action) => {
        if (gbAuthTypes.includes(action.type)) {
            const {api_key} = getState().auth.giantbomb;
            if (!api_key) {
                return;
            }
            next({
                ...action,
                payload: {
                    ...action.payload,
                    query: {
                        ...(action.payload?.query || {}),
                        ...defaultGbApiDefaults,
                        api_key,
                    },
                },
            });
            return;
        }
        next(action);
    };
