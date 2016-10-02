import React from 'react';
import { Link } from 'react-router';
import GiftActions from '../../actions/GiftActions';
import GiftStore from '../../stores/GiftStore';
import { HOME_ROUTE } from '../../constants/routes';
import Loader from '../Loader';
import { PAYMENT_METHODS } from '../../../lib/constants';
import css from './ConfirmationPage.styl';

export default class ConfirmationPage extends React.Component {
    static propTypes = {
        params: React.PropTypes.shape({
            giftSetId: React.PropTypes.string.isRequired,
        }).isRequired,
    };

    state = {
        ...GiftStore.getState(),
        linkClicked: false,
    };

    componentDidMount() {
        GiftStore.listen(this.onStoreChange);
        const { giftSetId } = this.props.params;
        GiftActions.fetch.defer(giftSetId);
    }

    componentWillUnmount() {
        GiftStore.unlisten(this.onStoreChange);
    }

    onStoreChange = (state) => {
        this.setState(state);
    };

    onLinkClicked = () => {
        this.setState({ linkClicked: true });
    };

    renderPaymentMessage = () => {
        const { paymentMethod } = this.state.giftSet;

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
    };

    renderPayPalLink = () => {
        const { giftSet: { paymentMethod, paypalLink } } = this.state;

        if (paymentMethod !== PAYMENT_METHODS.PAYPAL) {
            return null;
        }

        return (
            <a
                href={paypalLink}
                target="_blank"
                className="btn btn-success"
                rel="noopener noreferrer"
                onClick={this.onLinkClicked}
            >
                Pay with PayPal
            </a>
        );
    };

    renderHomeLink = () => {
        const { linkClicked, giftSet: { paymentMethod } } = this.state;

        if (paymentMethod === PAYMENT_METHODS.PAYPAL && !linkClicked) {
            return null;
        }

        return (
            <Link to={HOME_ROUTE} className="btn btn-default">Back to Home</Link>
        );
    };

    render() {
        return (
            <Loader loading={this.state.loading} className={css.root}>
                <h1 className={css.title}>Thank you very much for your gift!</h1>

                <div className={css.content}>
                    <p>The email confirmation for your gift is on the way!</p>

                    {this.renderPaymentMessage()}
                </div>

                <div className={css.actions}>
                    {this.renderPayPalLink()}

                    {this.renderHomeLink()}
                </div>
            </Loader>
        );
    }
}
