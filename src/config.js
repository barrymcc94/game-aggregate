import REACT_ICON from './static/img/react.svg';

export {REACT_ICON};

export const MEDIA_TYPES = {
    GAMES: 'games',
    COMPANIES: 'companies',
    FRANCHISES: 'franchises',
};

export const REQUEST_ERROR_TYPES = {
    ABORT_ERROR: 'AbortError',
};

export const dateFormat = 'dd-MM-yyyy';

export const defaultLimit = 100;

export const defaultGbApiDefaults = {
    format: 'json',
};

export const dev = {
    gbApiUrl: '',
};

export const prod = {
    gbApiUrl: '',
};

const config = process.env.NODE_ENV === 'development' ? dev : prod;

export default config;
