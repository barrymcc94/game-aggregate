import styled from 'styled-components';
import {
    Grid,
    Card,
    CardActionArea,
    CardMedia,
    CardContent,
    Typography,
} from '@material-ui/core';

const imageHeight = `11rem`;

export const StyledGrid = styled(Grid)`
    min-height: 15rem;
`;

export const StyledCard = styled(Card)`
    height: 100%;
`;

export const StyledCardActionArea = styled(CardActionArea)`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: normal;
    height: 100%;
`;

export const StyledCardMediaContainer = styled.div`
    height: ${imageHeight};
    width: 100%;
    overflow: hidden;
`;

export const StyledCardMedia = styled(CardMedia)`
    height: 100%;
    width: 100%;
    transition: transform 0.5s;
    ${StyledCardActionArea}:hover &,${StyledCardActionArea}:focus & {
        transform: scale(1.1);
    }
`;

export const StyledCardContent = styled(CardContent)`
    display: flex;
    flex: 1;
    flex-direction: column;
    padding: 0.5rem;
    width: 100%;
`;

export const StyledCardHeading = styled(Typography)`
    font-size: 1.3rem;
    line-height: 1;
    font-weight: 700;
    text-align: center;
`;

export const StyledCardBody = styled(Typography)`
    line-height: 1.2;
`;

export const StyledCardFooter = styled(Typography)`
    margin-top: auto;
    margin-left: auto;
`;
