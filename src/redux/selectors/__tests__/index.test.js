import {
    selectGame,
    selectCompany,
    selectFranchise,
    selectGames,
    selectCompanies,
    selectFranchises,
} from '../';

const singularSelectorList = [
    {
        selector: selectGame,
        selectorKey: 'games',
    },
    {
        selector: selectCompany,
        selectorKey: 'companies',
    },
    {
        selector: selectFranchise,
        selectorKey: 'franchises',
    },
];

const selectorList = [
    {
        selector: selectGames,
        selectorKey: 'games',
    },
    {
        selector: selectCompanies,
        selectorKey: 'companies',
    },
    {
        selector: selectFranchises,
        selectorKey: 'franchises',
    },
];

const createState = (selectorKey) => ({
    [selectorKey]: {
        byId: {
            id1: {id: 'id1'},
            id2: {id: 'id2'},
            id3: {id: 'id3'},
        },
        listData: {ids: ['id1', 'id2', 'id3'], isFetching: false},
    },
});

it.each(singularSelectorList)(
    'validates selectors (singular)',
    ({selector, selectorKey}) => {
        const state = createState(selectorKey);
        expect(selector(state, 'id1')).toStrictEqual({id: 'id1'});
    }
);

it.each(selectorList)(
    'validates selectors (listData)',
    ({selector, selectorKey}) => {
        const state = createState(selectorKey);
        expect(selector(state, 'listData')).toStrictEqual([
            {id: 'id1'},
            {id: 'id2'},
            {id: 'id3'},
        ]);
    }
);
