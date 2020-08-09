import React from 'react';
import PropTypes from 'prop-types';
import DocumentTitle from 'react-document-title';
import {injectIntl} from 'react-intl';
import {Franchise as FranchiseT} from '../../types';
import ErrorMessage from '../ErrorMessage';
import MediaHeader from '../MediaHeader';

export const Franchise = ({
    franchise = {},
    isFetching,
    error,
    intl: {formatMessage},
}) => {
    if (error || (!isFetching && (!franchise || !franchise.guid))) {
        return <ErrorMessage error={error} id="franchise.error" />;
    }
    return (
        <DocumentTitle
            title={
                franchise.name ||
                formatMessage({
                    id: 'franchisePage.title',
                    defaultMessage: 'Franchise',
                })
            }>
            <>
                <MediaHeader item={franchise} isLoading={isFetching} />
            </>
        </DocumentTitle>
    );
};

Franchise.propTypes = {
    intl: PropTypes.object,
    franchise: FranchiseT,
    isFetching: PropTypes.bool,
    error: PropTypes.bool,
};

export const isEqual = (prevProps, nextProps) =>
    prevProps.isFetching == nextProps.isFetching &&
    prevProps.franchise.guid == nextProps.franchise.guid;
export default injectIntl(React.memo(Franchise, isEqual));
