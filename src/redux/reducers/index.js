import {combineReducers} from 'redux';
import {locale} from './locale';
import {games} from './games';
import {game} from './game';
import {companies} from './companies';
import {company} from './company';

const reducers = combineReducers({
    locale,
    games,
    game,
    companies,
    company
});

export default reducers;