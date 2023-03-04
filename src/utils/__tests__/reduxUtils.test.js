import {
    normalizeObjectListing,
    combineNormalizedListingObjs,
} from '../reduxUtils';

describe('utils', () => {
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
});
