import {combineReducers} from 'redux';
import {locale} from './locale';
import {games} from './games';

const reducers = combineReducers({
    locale,
    games,
});

export default reducers;