import {shape, string, number} from 'prop-types';

export const GenericObject = shape({
    api_detail_url: string,
    id: number,
    name: string,
    site_detail_url: string,
});