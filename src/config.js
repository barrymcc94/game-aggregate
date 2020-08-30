import REACT_ICON from './static/img/react.svg';

export {REACT_ICON};

export const ENUMS = {
    MEDIA_TYPE: {
        GAMES: 'games',
        COMPANIES: 'companies',
        FRANCHISES: 'franchises',
    },
    CONTAINER_TYPE: {
        ALL: 'all',
        SEARCH: 'search',
        FILTERED: 'filtered',
    },
};

export const defaultLimit = 100;

export const defaultGbApiDefaults = {
    format: 'json',
};

export const dev = {
    gbApiUrl: '',
};

export const prod = {
    gbApiUrl: 'https://www.giantbomb.com',
};

const config = process.env.NODE_ENV === 'development' ? dev : prod;

export default config;
