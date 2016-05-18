import React from 'react';
import { Link } from 'react-router';
import GiftActions from '../../actions/GiftActions';
import GiftStore from '../../stores/GiftStore';
import { HOME_ROUTE } from '../../constants/routeConstants';
import Loader from '../common/Loader';
import { PAYMENT_METHODS } from '../../../lib/constants';
import css from './ConfirmationPage.styl';

export default class ConfirmationPage extends React.Component {
    static propTypes = {
        params: React.PropTypes.shape({
            giftSetId: React.PropTypes.string.isRequired,
        }).isRequired,
    };

    state = GiftStore.getState();

    componentDidMount() {
        GiftStore.listen(this.onStoreChange);
        const { giftSetId } = this.props.params;
        GiftActions.fetch.defer(giftSetId);
    }

    componentWillUnmount() {
        GiftStore.unlisten(this.onStoreChange);
    }

    onStoreChange = state => {
        this.setState(state);
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
                When you click 'Pay with PayPal' you will be redirect to
                the <a href="https://www.paypal.me/" target="_blank">paypal.me</a> website.
            </p>
        );
    };

    renderActions = () => {
        const { paymentMethod, paypalLink } = this.state.giftSet;

        if (paymentMethod !== PAYMENT_METHODS.PAYPAL) {
            return (
                <Link to={HOME_ROUTE} className="btn btn-success">Back to Home</Link>
            );
        }

        return (
            <a href={paypalLink} target="_blank" className="btn btn-success">Pay with PayPal</a>
        );
    };

    render() {
        return (
            <Loader loading={this.state.loading} className={css.root}>
                <h1 className={css.title}>Thank you very much for your gift!</h1>

                <div className={css.content}>
                    <p>You will receive an email with your gift confirmation.</p>

                    {this.renderPaymentMessage()}
                </div>

                {this.renderActions()}
            </Loader>
        );
    }
}
