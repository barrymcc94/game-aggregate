import {shape, string, number, arrayOf} from 'prop-types';

export const CompanyListItem = shape({
    abbreviation: string,
    aliases: string,
    api_detail_url: string,
    date_added: string,
    date_founded: string,
    date_last_updated: string,
    deck: string,
    description: string,
    guid: string,
    id: number,
    image: shape({
        icon_url: string,
        medium_url: string,
        screen_url: string,
        screen_large_url: string,
        small_url: string,
        super_url: string,
        thumb_url: string,
        tiny_url: string,
        original_url: string,
        image_tags: string,
    }),
    image_tags: arrayOf(
        shape({
            api_detail_url: string,
            name: string,
            total: number,
        })
    ),
    location_address: string,
    location_city: string,
    location_country: string,
    location_state: string,
    name: string,
    phone: string,
    site_detail_url: string,
    website: string,
});