import React from 'react';
import { FormGroup, ControlLabel, FormControl, Button, Radio, Alert } from 'react-bootstrap';
import { Link } from 'react-router';
import { BASKET_ROUTE } from '../../constants/routeConstants';
import Form from '../common/Form';
import css from './GiverDetailsForm.styl';
import { PAYMENT_METHODS } from '../../../lib/constants';

function renderPaymentMethodAlert(paymentMethod) {
    if (paymentMethod !== PAYMENT_METHODS.PAYPAL) {
        return null;
    }

    return (
        <Alert bsStyle="success">
            You will be redirected to <a target="_blank" href="https://www.paypal.me/">paypal.me</a> after completing your gift.
        </Alert>
    );
}

export default function GiverDetailsForm(props) {
    return (
        <Form onSubmit={props.onSubmit} loading={false} saving={props.isSaving}>
            <FormGroup>
                <ControlLabel>Forename</ControlLabel>
                <FormControl
                    name="forename"
                    type="text"
                    placeholder="Enter your forename"
                    value={props.giver.forename}
                    onChange={props.onChange}
                    required
                />
            </FormGroup>

            <FormGroup>
                <ControlLabel>Surname</ControlLabel>
                <FormControl
                    name="surname"
                    type="text"
                    placeholder="Enter your surname"
                    value={props.giver.surname}
                    onChange={props.onChange}
                    required
                />
            </FormGroup>

            <FormGroup>
                <ControlLabel>Email</ControlLabel>
                <FormControl
                    name="email"
                    type="email"
                    placeholder="Enter your email address"
                    value={props.giver.email}
                    onChange={props.onChange}
                    required
                />
            </FormGroup>

            <FormGroup>
                <ControlLabel>Telephone Number</ControlLabel>
                <FormControl
                    name="phoneNumber"
                    type="text"
                    placeholder="Enter your telephone number"
                    value={props.giver.phoneNumber}
                    onChange={props.onChange}
                    required
                />
            </FormGroup>

            <FormGroup>
                <ControlLabel>Payment Method</ControlLabel>

                <Radio
                    name="paymentMethod"
                    value={PAYMENT_METHODS.PAYPAL}
                    checked={props.giver.paymentMethod === PAYMENT_METHODS.PAYPAL}
                    onChange={props.onChange}
                >
                    PayPal
                </Radio>

                <Radio
                    name="paymentMethod"
                    value={PAYMENT_METHODS.BANK_TRANSFER}
                    checked={props.giver.paymentMethod === PAYMENT_METHODS.BANK_TRANSFER}
                    onChange={props.onChange}
                >
                    Bank Transfer
                </Radio>
            </FormGroup>

            {renderPaymentMethodAlert(props.giver.paymentMethod)}

            <div className={css.actions}>
                <Button
                    type="submit"
                    bsStyle="success"
                >
                    {props.isSaving ? 'Completing Gift...' : 'Complete Gift'}
                </Button>

                <Link
                    to={BASKET_ROUTE}
                    className="btn btn-default"
                    role="button"
                >
                    Back to Basket
                </Link>
            </div>
        </Form>
    );
}

GiverDetailsForm.propTypes = {
    giver: React.PropTypes.shape({
        forename: React.PropTypes.string.isRequired,
        surname: React.PropTypes.string.isRequired,
        email: React.PropTypes.string.isRequired,
        phoneNumber: React.PropTypes.string.isRequired,
        paymentMethod: React.PropTypes.string.isRequired,
    }).isRequired,
    isSaving: React.PropTypes.bool.isRequired,
    onChange: React.PropTypes.func.isRequired,
    onSubmit: React.PropTypes.func.isRequired,
};
