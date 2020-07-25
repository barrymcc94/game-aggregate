import styled from 'styled-components';
import {Typography} from '@material-ui/core';

export const GameDetailsSection = styled.section`
    display: flex;
`;

export const DescriptionList = styled(Typography)`
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    width: 100%;
`;

export const DescriptionWrapper = styled.div`
    width: calc(50% - 1rem);
    margin-bottom: 1rem;
`;

export const DescriptionLabel = styled.dt`
    font-weight: 700;
`;

export const DescriptionValue = styled.dd`
    margin-left: 0;
`;
