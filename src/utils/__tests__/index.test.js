import {
    jsonFetch,
    formatReqMeta,
    areShallowObjectsEqual,
    areRecordArraysTheSame,
    parseQueryVal,
    parseQueryStr,
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

    it('tests parseQueryVal', () => {
        expect(parseQueryVal('500')).toEqual(500);
        expect(parseQueryVal('true')).toEqual(true);
        expect(parseQueryVal('false')).toEqual(false);
        expect(parseQueryVal('test')).toEqual('test');
    });

    it('tests parseQueryStr', () => {
        expect(parseQueryStr()).toEqual({});
        expect(
            parseQueryStr(
                '?query1=test1&query2=test2&query3=test3%3Dvalue1&query3=test3%3Dvalue2&query3=test3%3Dvalue3'
            )
        ).toEqual({
            query1: 'test1',
            query2: 'test2',
            query3: ['test3=value1', 'test3=value2', 'test3=value3'],
        });
    });

    it('successfully creates a querystring using objToQueryStr 1', () => {
        const expectedResult =
            '?query1=test1&query2=test2&query4=test2%3D100&query4=test3%3D200&filter=name1:1,name2:2';
        const result = objToQueryStr({
            query1: 'test1',
            query2: 'test2',
            query3: undefined,
            query4: ['test2=100', 'test3=200'],
            filter: {name1: 1, name2: 2},
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
            filter: {original_release_date: '|2020-6-14 00:00:00'},
        });
        expect(
            getDefaultListingFilters('companies', {limit: 10, offset: 0})
        ).toEqual({
            ...expectedVal,
            filter: {},
            sort: 'date_founded:desc',
        });
        expect(
            getDefaultListingFilters('franchises', {limit: 10, offset: 0})
        ).toEqual({
            ...expectedVal,
            filter: {},
        });
        expect(
            getDefaultListingFilters('test', {limit: 10, offset: 0})
        ).toEqual({
            ...expectedVal,
        });
        expect(getDefaultListingFilters('', null)).toEqual({});
    });
});
