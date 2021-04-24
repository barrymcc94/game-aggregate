import {
    jsonFetch,
    formatReqMeta,
    getBreakPoint,
    areShallowObjectsEqual,
    areRecordArraysTheSame,
    objToQueryStr,
    objToFilterStr,
    normalizeObjectListing,
    combineNormalizedListingObjs,
    getDefaultListingFilters,
} from '../index';
import {defaultLimit} from '../../config';

describe('utils', () => {
    it('successfully tests fetching (mocked)', (done) => {
        fetch.mockImplementationOnce(() =>
            Promise.resolve({
                status: 200,
                json: () =>
                    Promise.resolve({
                        test: 'test',
                    }),
            })
        );

        jsonFetch('').then(() => {
            done();
        });
    });

    it('tests formatReqMeta', () => {
        const expectedResult1 = {
            _page: 2,
            _limit: 5,
        };
        const expectedResult2 = {
            _page: 1,
            _limit: defaultLimit,
        };

        const result1 = formatReqMeta(5, 5);
        const result2 = formatReqMeta(0, 0);
        expect(result1).toEqual(expectedResult1);
        expect(result2).toEqual(expectedResult2);
    });

    it('tests getBreakPoint', () => {
        expect(getBreakPoint({}, '')).toEqual('');
        expect(getBreakPoint({breakpoints: {}}, 'xs')).toEqual('');
        expect(getBreakPoint({breakpoints: {values: {}}}, 'xs')).toEqual('');
        expect(getBreakPoint({breakpoints: {values: {xs: 0}}}, 'xs')).toEqual(
            '0px'
        );
        expect(getBreakPoint({breakpoints: {values: {sm: 600}}}, 'sm')).toEqual(
            '600px'
        );
    });

    it('tests areShallowObjectsEqual', () => {
        const result1 = areShallowObjectsEqual({prop1: 1}, {prop1: 1});
        const result2 = areShallowObjectsEqual(1, 1);
        const result3 = areShallowObjectsEqual({prop1: 1}, {prop1: 2});
        const result4 = areShallowObjectsEqual(
            {prop1: 1, prop2: 2},
            {prop1: 1}
        );
        const result5 = areShallowObjectsEqual(
            {prop1: {prop: 1}},
            {prop1: {prop: 1}}
        );
        expect(result1).toEqual(true);
        expect(result2).toEqual(false);
        expect(result3).toEqual(false);
        expect(result4).toEqual(false);
        expect(result5).toEqual(false);
    });

    it('tests areRecordArraysTheSame', () => {
        const result1 = areRecordArraysTheSame(
            [
                {
                    id: 1,
                    title: 'post 1',
                },
            ],
            [
                {
                    id: 1,
                    title: 'post 1',
                },
            ]
        );
        const result2 = areRecordArraysTheSame(
            [
                {
                    id: 1,
                    title: 'post 1',
                },
            ],
            [
                {
                    id: 2,
                    title: 'post 2',
                },
            ]
        );
        const result3 = areRecordArraysTheSame(
            [
                {
                    id: 1,
                    title: 'post 1',
                },
            ],
            []
        );
        const result4 = areRecordArraysTheSame();
        expect(result1).toEqual(true);
        expect(result2).toEqual(false);
        expect(result3).toEqual(false);
        expect(result4).toEqual(false);
    });

    it('successfully creates a querystring using objToQueryStr 1', () => {
        const expectedResult = '?query1=test1&query2=test2';
        const result = objToQueryStr({
            query1: 'test1',
            query2: 'test2',
        });
        expect(result).toEqual(expectedResult);
    });

    it('successfully creates a querystring using objToQueryStr 2', () => {
        const expectedResult = '';
        const result = objToQueryStr({});
        expect(result).toEqual(expectedResult);
    });

    it('successfully creates a querystring using objToQueryStr 3', () => {
        const expectedResult = '';
        const result = objToQueryStr();
        expect(result).toEqual(expectedResult);
    });

    it('successfully creates a filter string using objToFilterStr 1', () => {
        const expectedResult = 'filter1:test1,filter2:test2';
        const result = objToFilterStr({
            filter1: 'test1',
            filter2: 'test2',
        });
        expect(result).toEqual(expectedResult);
    });

    it('successfully creates a filter string using objToFilterStr 2', () => {
        const expectedResult = '';
        const result = objToFilterStr({});
        expect(result).toEqual(expectedResult);
    });

    it('successfully normalizes an object array using normalizeObjectListing 1', () => {
        const expectedResult = {
            ids: [1, 2],
            byId: {
                1: {
                    id: 1,
                    title: 'post 1',
                },
                2: {
                    id: 2,
                    title: 'post 2',
                },
            },
        };
        const result = normalizeObjectListing(
            [
                {
                    id: 1,
                    title: 'post 1',
                },
                {
                    id: 2,
                    title: 'post 2',
                },
            ],
            'id'
        );
        expect(result).toEqual(expectedResult);
    });

    it('successfully normalizes an object array using normalizeObjectListing 2', () => {
        const expectedResult = {
            ids: [],
            byId: {},
        };
        const result = normalizeObjectListing([], 'id');
        expect(result).toEqual(expectedResult);
    });

    it('successfully normalizes an object array using normalizeObjectListing 3', () => {
        const expectedResult = {
            ids: [],
            byId: {},
        };
        const result = normalizeObjectListing();
        expect(result).toEqual(expectedResult);
    });

    it('successfully handles invalid params in normalizeObjectListing', () => {
        const expectedResult = {
            ids: [],
            byId: {},
        };
        const result = normalizeObjectListing([null, null], 'id');
        expect(result).toEqual(expectedResult);
    });

    it('successfully combines identifiable objects using combineNormalizedListingObjs 1', () => {
        const expectedResult = {
            ids: [1, 2],
            byId: {
                1: {
                    id: 1,
                    title: 'post 1',
                },
                2: {
                    id: 2,
                    title: 'post 2',
                },
            },
        };
        const result = combineNormalizedListingObjs(
            {
                ids: [1],
                byId: {
                    1: {
                        id: 1,
                        title: 'post 1',
                    },
                },
            },
            {
                ids: [2],
                byId: {
                    2: {
                        id: 2,
                        title: 'post 2',
                    },
                },
            }
        );
        expect(result).toEqual(expectedResult);
    });

    it('successfully combines identifiable objects using combineNormalizedListingObjs 2', () => {
        const expectedResult = {
            ids: [],
            byId: {},
        };
        const result = combineNormalizedListingObjs(null, {
            ids: [2],
            byId: {
                2: {
                    id: 2,
                    title: 'post 2',
                },
            },
        });
        expect(result).toEqual(expectedResult);
    });

    it('tests getDefaultListingFilters works as expected', () => {
        const expectedVal = {
            limit: 10,
            offset: 0,
        };
        expect(
            getDefaultListingFilters('games', {limit: 10, offset: 0})
        ).toEqual({
            ...expectedVal,
            sort: 'original_release_date:desc',
            filter: 'original_release_date:|2020-6-14 00:00:00',
        });
        expect(
            getDefaultListingFilters('companies', {limit: 10, offset: 0})
        ).toEqual({
            ...expectedVal,
            filter: '',
            sort: 'date_founded:desc',
        });
        expect(
            getDefaultListingFilters('franchises', {limit: 10, offset: 0})
        ).toEqual({
            ...expectedVal,
            filter: '',
        });
        expect(
            getDefaultListingFilters('test', {limit: 10, offset: 0})
        ).toEqual({
            ...expectedVal,
        });
        expect(getDefaultListingFilters('', null)).toEqual({});
    });
});
