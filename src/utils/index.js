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
                ? `${k}=${encodeURIComponent(obj[k])}`
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

export const getDefaultListingFilters = (mediaType, meta) => {
    try {
        let defaultQueryObj = {
            limit: meta.limit || defaultLimit,
            offset: meta.offset || 0,
        };
        if (mediaType == GAMES) {
            defaultQueryObj = {
                ...defaultQueryObj,
                sort: 'original_release_date:desc',
                filter: objToFilterStr(getDefaultGamesFilter()),
            };
        } else if (mediaType == COMPANIES) {
            defaultQueryObj = {
                ...defaultQueryObj,
                sort: 'date_founded:desc',
                filter: objToFilterStr(getDefaultCompaniesFilter()),
            };
        } else if (mediaType == FRANCHISES) {
            defaultQueryObj = {
                ...defaultQueryObj,
                filter: objToFilterStr(getDefaultFranchisesFilter()),
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

export const areShallowObjectsEqual = (obj1, obj2) => {
    if (obj1 !== Object(obj1) || obj2 !== Object(obj2)) {
        return false;
    }
    for (let prop in obj1) {
        if (!(prop in obj2) || obj1[prop] !== obj2[prop]) {
            return false;
        }
    }
    return true;
};

export const areRecordArraysTheSame = (arr1, arr2) => {
    if (!Array.isArray(arr1) || !Array.isArray(arr2)) {
        return false;
    }
    if (arr1.length !== arr2.length) {
        return false;
    }
    for (const prop in arr1) {
        if (!arr2[prop] || arr1[prop].id !== arr2[prop].id) {
            return false;
        }
    }
    return true;
};

export const normalizeObjectListing = (objArr, idProp) => {
    if (!Array.isArray(objArr)) {
        return {
            ids: [],
            byId: {},
        };
    }
    return {
        ids: objArr.map((item) => item[idProp]),
        byId: objArr.reduce(
            (accum, item) => ({
                ...accum,
                [item[idProp]]: item,
            }),
            {}
        ),
    };
};

export const combineNormalizedListingObjs = (data1, data2) => ({
    byId: {
        ...data1.byId,
        ...data2.byId,
    },
    ids: [...new Set([...data1.ids, ...data2.ids])],
});
