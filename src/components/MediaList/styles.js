import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';

export const StyledGrid = styled(Grid)`
    position: relative;
    margin-bottom: 1rem;
`;

export const StyledCarouselWrapper = styled.div`
    position: relative;
    margin-bottom: 1rem;
    width: 100%;
    .carousel-list::-webkit-scrollbar {
        width: 0px;
        height: 0px;
        background: transparent;
    }

    .carousel-list {
        scrollbar-width: none;
        -ms-overflow-style: none;
    }
`;
