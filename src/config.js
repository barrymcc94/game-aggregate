import REACT_ICON from './static/img/react.svg';

export {REACT_ICON};

export const ENUMS = {
    MEDIA_TYPE: {
        GAMES: 'games',
        COMPANIES: 'companies',
        FRANCHISES: 'franchises',
    },
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
