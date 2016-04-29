import React from 'react';
import { Link } from 'react-router';
import { HOME_ROUTE } from '../../constants/routeConstants';

import css from './ConfirmationPage.styl';

export default function ConfirmationPage() {
    return (
        <section className={css.root}>
            <h1 className={css.title}>Thank you very much for your gift!</h1>

            <div className={css.content}>
                <p>You will receive an email (this is still a work in progress) with your gift confirmation.</p>

                <p>We will then be in touch with our bank transfer details, as all payments are offline.</p>
            </div>

            <Link to={HOME_ROUTE} className="btn btn-success" role="button">Back to Home</Link>
        </section>
    );
}
