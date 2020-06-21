import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import {getBreakPoint} from '../../utils';

export const StyledGameHeader = styled.header`
    display: flex;
    flex-direction: column;
    @media (min-width: ${({theme}) => getBreakPoint(theme, 'md')}) {
        flex-direction: row;
    }
`;

export const PosterImg = styled.img`
    max-height: 22rem;
    margin: 0 auto 1rem auto;
    @media (min-width: ${({theme}) => getBreakPoint(theme, 'md')}) {
        margin: 0 auto;
    }
`;

export const TitleContent = styled.div`
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    margin-left: 1rem;
`;

export const HeadingFooter = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: auto;
`;

export const FooterItem = styled.div`
    display: flex;
`;

export const GameName = styled(Typography)`
    font-weight: 700;
`;

export const GameText = styled(Typography)`
    margin-bottom: 1rem;
    line-height: 1.25;
`;

export const DescriptionList = styled(Typography)`
    margin: 0 0 1rem 0;
`;

export const DescriptionLabel = styled.dt`
    font-weight: 700;
`;

export const DescriptionValue = styled.dd`
    margin-left: 0;
`;