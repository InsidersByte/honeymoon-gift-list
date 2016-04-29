import React from 'react';
import { Link } from 'react-router';
import { HOME_ROUTE } from '../constants/routeConstants';

import css from './NoMatch.styl';

export default function NoMatch() {
    return (
        <div className={css.root}>
            <h1 className={css.title}>Page not found</h1>

            <div className={css.content}>
                Woops! Sorry, there is nothing to see here.
            </div>

            <Link to={HOME_ROUTE} className="btn btn-success" role="button">Back to Home</Link>
        </div>
    );
}
