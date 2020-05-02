import REACT_ICON from './static/img/react.svg';

export {REACT_ICON};
export const defaultLimit = 5;

export const dev = {
    apiUrl: '/api'
};

export const prod = {
    apiUrl: '/api'
};

const config = process.env.NODE_ENV === 'development' ? dev : prod;

export default config;