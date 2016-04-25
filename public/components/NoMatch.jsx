import React from 'react';
import { Link } from 'react-router';
import { HOME_ROUTE } from '../constants/routeConstants';

import './NoMatch.styl';

export default function NoMatch() {
    return (
        <div className="no-match">
            <h1 className="no-match__title">Page not found</h1>

            <div className="no-match__content">
                Woops! Sorry, there is nothing to see here.
            </div>

            <Link to={HOME_ROUTE} className="btn btn-success" role="button">Back to Home</Link>
        </div>
    );
}
