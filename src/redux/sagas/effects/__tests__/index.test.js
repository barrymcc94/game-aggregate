import {createMockTask} from '@redux-saga/testing-utils';
import {fetchGamesSaga} from '../../games';
import {takeLatestByIdGen} from '../index';

describe('Effects', () => {
    it('tests takeLatestByIdGen', () => {
        const gen = takeLatestByIdGen(
            'FETCH_GAMES_STARTED',
            fetchGamesSaga,
            'id'
        )();

        expect(
            gen.next({
                type: 'FETCH_GAMES_STARTED',
                payload: {id: 'games_id'},
            }).value.type
        ).toEqual('TAKE');

        expect(
            gen.next({
                type: 'FETCH_GAMES_STARTED',
                payload: {id: 'games_id'},
            }).value.type
        ).toEqual('FORK');

        expect(gen.next(createMockTask()).value.type).toEqual('TAKE');

        expect(
            gen.next({
                type: 'FETCH_GAMES_STARTED',
                payload: {id: 'games_id'},
            }).value.type
        ).toEqual('CANCEL');
    });
});
