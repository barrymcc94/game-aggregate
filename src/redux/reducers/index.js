import {combineReducers} from 'redux';
import {locale} from './locale';
import {auth} from './auth';
import {games} from './games';
import {companies} from './companies';
import {franchises} from './franchises';

const reducers = combineReducers({
    locale,
    auth,
    games,
    companies,
    franchises,
});

export default reducers;
