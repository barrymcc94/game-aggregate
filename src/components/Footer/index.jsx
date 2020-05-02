import React from 'react';
import {Link} from 'react-router-dom';
import {FormattedMessage} from 'react-intl';
import {StyledFooter, StyledFooterItems, StyledFooterItem} from './styles';

const Footer = () => (
    <StyledFooter>
        <StyledFooterItems>
            <StyledFooterItem>
                <FormattedMessage id="footer.copyright" defaultMessage="Copyright © Barry McCormack 2020"/>
            </StyledFooterItem>
            <StyledFooterItem>
                <Link to="/about">
                    <FormattedMessage id="footer.about" defaultMessage="About"/>
                </Link>
            </StyledFooterItem>
        </StyledFooterItems>
    </StyledFooter>
);

export default Footer;
