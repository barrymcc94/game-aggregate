import {combineReducers} from 'redux';
import {locale} from './locale';
import {auth} from './auth';
import {games} from './games';
import {companies} from './companies';
import {company} from './company';
import {franchises} from './franchises';
import {franchise} from './franchise';

const reducers = combineReducers({
    locale,
    auth,
    games,
    companies,
    company,
    franchises,
    franchise,
});

export default reducers;
