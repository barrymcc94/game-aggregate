import {combineReducers} from 'redux';
import {locale} from './locale';
import {games} from './games';
import {game} from './game';

const reducers = combineReducers({
    locale,
    games,
    game,
});

export default reducers;