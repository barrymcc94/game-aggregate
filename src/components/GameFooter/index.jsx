import React from 'react';
import PropTypes from 'prop-types';
import Link from '@material-ui/core/Link';
import {FormattedMessage} from 'react-intl';
import SkeletonLoader from '../SkeletonLoader';
import {StyledGameFooter, FooterText} from './styles';

export const GameFooter = ({isLoading}) => (
    <StyledGameFooter>
        <FooterText variant="subtitle2" component="span">
            {isLoading ? (
                <SkeletonLoader variant="text" numLines={1} />
            ) : (
                <FormattedMessage
                    id="gameFooter.poweredBy"
                    values={{
                        link: (
                            <Link href="https://www.giantbomb.com/api/">
                                GiantBomb
                            </Link>
                        ),
                    }}
                />
            )}
        </FooterText>
    </StyledGameFooter>
);

GameFooter.propTypes = {
    isLoading: PropTypes.bool,
};

export const isEqual = (prevProps, nextProps) =>
    prevProps.isLoading == nextProps.isLoading;
export default React.memo(GameFooter, isEqual);
