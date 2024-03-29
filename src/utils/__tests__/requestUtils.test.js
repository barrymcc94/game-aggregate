import {defaultLimit, REQUEST_ERROR_TYPES} from '../../config';
import {
    jsonFetch,
    formatReqMeta,
    parseQueryVal,
    parseQueryStr,
    objToQueryStr,
    objToFilterStr,
    getDefaultListingFilters,
} from '../requestUtils';

describe('Request Utils', () => {
    it('successfully tests fetching', async () => {
        fetch.mockImplementationOnce(() =>
            Promise.resolve({
                status: 200,
                json: () =>
                    Promise.resolve({
                        test: 'test',
                    }),
            })
        );

        const json = await jsonFetch('');
        expect(json).toEqual({test: 'test'});
    });

    it('successfully tests fetching with success handler', async () => {
        fetch.mockImplementationOnce(() =>
            Promise.resolve({
                status: 200,
                json: () =>
                    Promise.resolve({
                        test: 'test',
                    }),
            })
        );
        const onSuccess = jest.fn();

        await jsonFetch('', {}, onSuccess);
        expect(onSuccess).toHaveBeenCalledTimes(1);
        expect(onSuccess).toHaveBeenCalledWith({test: 'test'});
    });

    it('verifies fetch abort error does not throw an error', async () => {
        fetch.mockRejectedValueOnce({name: REQUEST_ERROR_TYPES.ABORT_ERROR});

        try {
            await jsonFetch('');
        } catch (e) {
            expect(e).toEqual(undefined);
        }
    });

    it('successfully tests a an error that is not an abort error is thrown', async () => {
        fetch.mockRejectedValueOnce({name: 'error'});

        try {
            await jsonFetch('');
        } catch (e) {
            expect(e).toEqual({name: 'error'});
        }
    });

    it('successfully tests a an error that is not an abort error is thrown with error handler', async () => {
        fetch.mockRejectedValueOnce({name: 'error'});
        const onError = jest.fn();

        try {
            await jsonFetch('', {}, null, onError);
        } catch (e) {
            expect(onError).toBeCalledTimes(1);
            expect(onError).toBeCalledWith({name: 'error'});
            expect(e).toEqual({name: 'error'});
        }
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
