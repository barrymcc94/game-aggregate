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
    try {
        let queries = [];
        for (let k in obj) {
            queries.push(`${k}=${obj[k]}`);
        }
        if (queries.length) {
            return `?${queries.join('&')}`;
        }
        throw new Error('Value supplied to objToQueryStr function is invalid');
    } catch (err) {
        return '';
    }
};

export const objToFilterStr = (obj) => {
    try {
        let filterArr = [];
        for (let k in obj) {
            filterArr.push(`${k}:${obj[k]}`);
        }
        if (filterArr.length) {
            return filterArr.join(',');
        }
        throw new Error('Value supplied to objToFilterStr function is invalid');
    } catch (err) {
        return '';
    }
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

export const getBreakPoint = (theme, breakpoint) => {
    try {
        const num = theme.breakpoints.values[breakpoint];
        if (Number.isInteger(num)) {
            return `${num}px`;
        }
        return '';
    } catch (e) {
        return '';
    }
};

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
    try {
        if (arr1.length !== arr2.length) {
            return false;
        }
        for (let prop in arr1) {
            if (!arr2[prop] || arr1[prop].id !== arr2[prop].id) {
                return false;
            }
        }
        return true;
    } catch {
        return false;
    }
};

export const normalizeObjectListing = (objArr, idProp) => {
    try {
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
    } catch {
        return {
            ids: [],
            byId: {},
        };
    }
};

export const combineNormalizedListingObjs = (data1, data2) => {
    try {
        return {
            byId: {
                ...data1.byId,
                ...data2.byId,
            },
            ids: [...new Set([...data1.ids, ...data2.ids])],
        };
    } catch (e) {
        return {
            byId: {},
            ids: [],
        };
    }
};
