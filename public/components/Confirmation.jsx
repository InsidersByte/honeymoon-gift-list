/* @flow */

import React from 'react';
import { Link } from 'react-router';
import { HOME_ROUTE } from '../constants/routes';
import Loader from '../components/Loader';
import { PAYMENT_METHODS } from '../../lib/constants';
// FIXME:FLOW need to fix import .styl
import css from '../components/Confirmation.styl';

type PropsType = {
    loading: boolean,
    linkClicked: boolean,
    giftSet: {
        paymentMethod: string,
        paypalLink: string,
    },
    onLinkClicked: Function,
};

function renderPaymentMessage({ paymentMethod }: { paymentMethod: string }) {
    if (paymentMethod !== PAYMENT_METHODS.PAYPAL) {
        return (
            <p>We will then be in touch with you soon with our bank transfer details.</p>
        );
    }

    return (
        <p>
            When you click &#39;Pay with PayPal&#39; you will be redirect to
            the <a href="https://www.paypal.me/" target="_blank" rel="noopener noreferrer">paypal.me</a> website.
        </p>
    );
}

export default function Confirmation({ loading, giftSet: { paymentMethod, paypalLink }, onLinkClicked, linkClicked }: PropsType) {
    const showPaypalLink = paymentMethod === PAYMENT_METHODS.PAYPAL;
    const showHomeLink = paymentMethod !== PAYMENT_METHODS.PAYPAL || linkClicked;

    return (
        <Loader loading={loading} className={css.root}>
            <h1 className={css.title}>Thank you very much for your gift!</h1>

            <div className={css.content}>
                <p>The email confirmation for your gift is on the way!</p>

                {renderPaymentMessage({ paymentMethod })}
            </div>

            <div className={css.actions}>
                {showPaypalLink &&
                    <a
                        href={paypalLink}
                        target="_blank"
                        className="btn btn-success"
                        rel="noopener noreferrer"
                        onClick={onLinkClicked}
                    >
                        Pay with PayPal
                    </a>
                }

                {showHomeLink && <Link to={HOME_ROUTE} className="btn btn-default">Back to Home</Link>}
            </div>
        </Loader>
    );
}
