import {sub, format} from 'date-fns';
import {ENUMS, defaultLimit} from '../config';
const {GAMES, COMPANIES, FRANCHISES} = ENUMS.MEDIA_TYPE;

export const jsonFetch = async (url) => {
    const req = new Request(url);
    return await fetch(req)
        .then((response) => response.json())
        .then((jsonRes) => jsonRes);
};

export const objToQueryStr = (obj) => {
    if (!obj) {
        return '';
    }
    const queries = Object.keys(obj)
        .map((k) =>
            Array.isArray(obj[k])
                ? `${obj[k]
                      .map((item) => `${k}=${encodeURIComponent(item)}`)
                      .join('&')}`
                : obj[k] !== undefined
                ? k === 'filter'
                    ? `${k}=${objToFilterStr(obj[k])}`
                    : `${k}=${encodeURIComponent(obj[k])}`
                : ''
        )
        .filter((elem) => !!`${elem}`);
    return queries.length ? `?${queries.join('&')}` : '';
};

export const parseQueryVal = (value) => {
    if (!isNaN(value)) {
        return Number(value);
    }
    if (['true', 'false'].includes(value)) {
        return JSON.parse(value);
    }
    return value;
};

export const parseQueryStr = (queryStr) =>
    queryStr && queryStr.length
        ? queryStr
              .substring(1)
              .split('&')
              .reduce((accumulator, elem) => {
                  const [key, value] = elem.split('=');
                  const parsedVal = parseQueryVal(decodeURIComponent(value));
                  const existingVal = accumulator[key];
                  return {
                      ...accumulator,
                      [key]: existingVal
                          ? [
                                ...(Array.isArray(existingVal)
                                    ? existingVal
                                    : [existingVal]),
                                parsedVal,
                            ]
                          : parsedVal,
                  };
              }, {})
        : {};

export const objToFilterStr = (obj) => {
    let filterArr = [];
    for (let k in obj) {
        filterArr.push(`${k}:${obj[k]}`);
    }
    if (filterArr.length) {
        return filterArr.join(',');
    }
    return '';
};

export const getDefaultGamesFilter = () => {
    const dateFormat = 'yyyy-M-d 00:00:00';
    const startDate = '';
    const endDate = format(new Date(sub(new Date(), {days: 1})), dateFormat);
    return {original_release_date: `${startDate}|${endDate}`};
};

export const getDefaultCompaniesFilter = () => ({});

export const getDefaultFranchisesFilter = () => ({});

export const getDefaultListingFilters = (mediaType, query) => {
    try {
        let defaultQueryObj = {
            limit: query.limit || defaultLimit,
            offset: query.offset || 0,
        };
        if (mediaType == GAMES) {
            defaultQueryObj = {
                ...defaultQueryObj,
                sort: 'original_release_date:desc',
                filter: getDefaultGamesFilter(),
            };
        } else if (mediaType == COMPANIES) {
            defaultQueryObj = {
                ...defaultQueryObj,
                sort: 'date_founded:desc',
                filter: getDefaultCompaniesFilter(),
            };
        } else if (mediaType == FRANCHISES) {
            defaultQueryObj = {
                ...defaultQueryObj,
                filter: getDefaultFranchisesFilter(),
            };
        }
        return defaultQueryObj;
    } catch (e) {
        return {};
    }
};

export const formatReqMeta = (offset, limit) => ({
    _page: offset ? offset / limit + 1 : 1,
    _limit: limit || defaultLimit,
});
