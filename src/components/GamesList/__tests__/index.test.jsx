import React from "react";
import {GamesList} from '../index'
import {mountWithBaseWrapper} from '../../../../tests/helper';
import {StyledSkeletonLoader} from "../../SkeletonLoader/styles";
import Grid from '@material-ui/core/Grid';

describe('<GamesList/>', () => {

    it('tests loader appears when fetching', () => {
        const wrapper = mountWithBaseWrapper(<GamesList
            isFetching={true}
            error={false}
            games={[{
                id: 1,
                name: 'name',
                deck: 'deck',
                original_release_date: 'date',
                image: {
                    screen_url: 'test'
                }
            }]} />);
        expect(wrapper.exists(StyledSkeletonLoader)).toBe(true);
        expect(wrapper.exists(Grid)).toBe(true);
        expect(wrapper).toMatchSnapshot();
    });

    it('tests gamelist renders as expected with game data', () => {
        const wrapper = mountWithBaseWrapper(<GamesList
            isFetching={false}
            error={false}
            games={[{
                id: 1,
                name: 'name',
                deck: 'deck',
                original_release_date: 'date',
                image: {
                    screen_url: 'test'
                }
            }]} />);
        expect(wrapper.exists(StyledSkeletonLoader)).toBe(false);
        expect(wrapper.exists(Grid)).toBe(true);
        expect(wrapper).toMatchSnapshot();
    });
});