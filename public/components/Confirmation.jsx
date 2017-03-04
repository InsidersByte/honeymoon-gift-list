/* @flow */

import React from 'react';
import { Link } from 'react-router';
import { RaisedButton } from 'material-ui';
import { HOME_ROUTE } from '../constants/routes';
import Loader from './Loader';
import { PAYMENT_METHODS } from '../../lib/constants';
import type { GiftSetType } from '../types';
import css from '../components/Confirmation.styl';

type PropsType = {
    loading: boolean,
    linkClicked: boolean,
    giftSet: GiftSetType,
    onLinkClicked: () => void,
};

const styles = {
    button: {
        marginTop: 12,
        marginRight: 12,
    },
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

const Confirmation = ({ loading, giftSet: { paymentMethod, paypalLink }, onLinkClicked, linkClicked }: PropsType) => {
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
                    <RaisedButton
                        primary
                        linkButton
                        label="Pay with PayPal"
                        href={paypalLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={onLinkClicked}
                        disableFocusRipple
                        disableKeyboardFocus
                        disableTouchRipple
                        style={styles.button}
                    />
                }

                {showHomeLink &&
                    <RaisedButton
                        label="Back to Home"
                        containerElement={<Link to={HOME_ROUTE}>Back to Home</Link>}
                        linkButton
                        style={styles.button}
                    />
                }
            </div>
        </Loader>
    );
};

export default Confirmation;
