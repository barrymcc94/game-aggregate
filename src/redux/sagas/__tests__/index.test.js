import sagas from '../';

describe('Sagas', () => {
    it('successfully calls sagas function', () => {
        const {payload} = sagas().next().value;
        expect(payload.length).toEqual(8);
    });
});
