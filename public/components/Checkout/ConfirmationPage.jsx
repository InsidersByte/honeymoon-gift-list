import React from 'react';
import { Link } from 'react-router';
import { HOME_ROUTE } from '../../constants/routeConstants';

import css from './ConfirmationPage.styl';

export default function ConfirmationPage() {
    return (
        <section className={css.root}>
            <h1 className={css.title}>Thank you very much for your gift!</h1>

            <div className={css.content}>
                <p>You will receive an email with your gift confirmation.</p>
            </div>

            <Link to={HOME_ROUTE} className="btn btn-success" role="button">Back to Home</Link>
        </section>
    );
}
