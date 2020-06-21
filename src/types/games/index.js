import {shape, string, number, arrayOf} from 'prop-types';

export const GameListItem = shape({
    aliases: string,
    api_detail_url: string,
    date_added: string,
    date_last_updated: string,
    deck: string,
    description: string,
    expected_release_day: number,
    expected_release_month: number,
    expected_release_quarter: number,
    expected_release_year: number,
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
    name: string,
    number_of_user_reviews: number,
    original_game_rating: arrayOf(
        shape({
            api_detail_url: string,
            id: number,
            name: string,
        })
    ),
    original_release_date: string,
    platforms: arrayOf(
        shape({
            api_detail_url: string,
            id: number,
            name: string,
            site_detail_url: string,
            abbreviation: string,
        })
    ),
    site_detail_url: string,
});