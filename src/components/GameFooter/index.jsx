import React from 'react';
import PropTypes from 'prop-types';
import Link from '@material-ui/core/Link';
import {FormattedMessage, injectIntl} from 'react-intl';
import Loader from '../Loader';
import {StyledGameFooter, FooterText} from './styles';

export const GameFooter = ({isFetching}) => {
    return <Loader isLoading={isFetching}>
        <StyledGameFooter>
            <FooterText variant="subtitle2" component="span">
                <FormattedMessage
                    id="gameFooter.poweredBy"
                    defaultMessage="Powered By {link}"
                    values={{
                        link: <Link href="https://www.giantbomb.com/api/">GiantBomb</Link>
                    }}
                />
            </FooterText>
        </StyledGameFooter>
    </Loader>
}

GameFooter.propTypes = {
    isFetching: PropTypes.bool
}

export default injectIntl(GameFooter);