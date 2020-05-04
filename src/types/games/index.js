import PropTypes from 'prop-types';

export const Game = PropTypes.shape({
    aliases: PropTypes.string,
    api_detail_url: PropTypes.string,
    date_added: PropTypes.string,
    date_last_updated: PropTypes.string,
    deck: PropTypes.string,
    description: PropTypes.string,
    expected_release_day: PropTypes.number,
    expected_release_month: PropTypes.number,
    expected_release_quarter: PropTypes.number,
    expected_release_year: PropTypes.number,
    guid: PropTypes.string,
    id: PropTypes.number,
    image: PropTypes.shape({
        icon_url: PropTypes.string,
        medium_url: PropTypes.string,
        screen_url: PropTypes.string,
        screen_large_url: PropTypes.string,
        small_url: PropTypes.string,
        super_url: PropTypes.string,
        thumb_url: PropTypes.string,
        tiny_url: PropTypes.string,
        original_url: PropTypes.string,
        image_tags: PropTypes.string
    }),
    image_tags: PropTypes.arrayOf(
        PropTypes.shape({
        api_detail_url: PropTypes.string,
        name: PropTypes.string,
        total: PropTypes.number
        })
    ),
    name: PropTypes.string,
    number_of_user_reviews: PropTypes.number,
    original_game_rating: PropTypes.arrayOf(
        PropTypes.shape({
            api_detail_url: PropTypes.string,
            id: PropTypes.number,
            name: PropTypes.string
        })
    ),
    original_release_date: PropTypes.string,
    platforms: PropTypes.arrayOf(
        PropTypes.shape({
            abbreviation: PropTypes.string,
            api_detail_url: PropTypes.string,
            id: PropTypes.number,
            name: PropTypes.string,
            site_detail_url: PropTypes.string
        })
    ),
    site_detail_url: PropTypes.string
});