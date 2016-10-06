/* @flow */

import React from 'react';
import { FormGroup, ControlLabel, FormControl, Button, Radio } from 'react-bootstrap';
import { Link } from 'react-router';
import { BASKET_ROUTE } from '../constants/routes';
import Form from './Form';
import { PAYMENT_METHODS } from '../../lib/constants';
import css from './GiverDetailsForm.styl';

type PropsType = {
    giver: {
        forename: string,
        surname: string,
        email: string,
        phoneNumber: string,
        paymentMethod: string,
    },
    saving: boolean,
    onChange: Function,
    onSubmit: Function,
};

export default function GiverDetailsForm({ giver: { forename, surname, email, phoneNumber, paymentMethod }, saving, onChange, onSubmit }: PropsType) {
    return (
        <section className={css.root}>
            <div className={css.container}>
                <h1 className={css.title}>Your Details</h1>

                <Form onSubmit={onSubmit} loading={false} saving={saving}>
                    <FormGroup>
                        <ControlLabel>Forename</ControlLabel>
                        <FormControl
                            name="forename"
                            type="text"
                            placeholder="Enter your forename"
                            value={forename}
                            onChange={onChange}
                            required
                        />
                    </FormGroup>

                    <FormGroup>
                        <ControlLabel>Surname</ControlLabel>
                        <FormControl
                            name="surname"
                            type="text"
                            placeholder="Enter your surname"
                            value={surname}
                            onChange={onChange}
                            required
                        />
                    </FormGroup>

                    <FormGroup>
                        <ControlLabel>Email</ControlLabel>
                        <FormControl
                            name="email"
                            type="email"
                            placeholder="Enter your email address"
                            value={email}
                            onChange={onChange}
                            required
                        />
                    </FormGroup>

                    <FormGroup>
                        <ControlLabel>Telephone Number</ControlLabel>
                        <FormControl
                            name="phoneNumber"
                            type="text"
                            placeholder="Enter your telephone number"
                            value={phoneNumber}
                            onChange={onChange}
                            required
                        />
                    </FormGroup>

                    <FormGroup>
                        <ControlLabel>Payment Method</ControlLabel>

                        <Radio
                            name="paymentMethod"
                            value={PAYMENT_METHODS.PAYPAL}
                            checked={paymentMethod === PAYMENT_METHODS.PAYPAL}
                            onChange={onChange}
                        >
                            PayPal
                        </Radio>

                        <Radio
                            name="paymentMethod"
                            value={PAYMENT_METHODS.BANK_TRANSFER}
                            checked={paymentMethod === PAYMENT_METHODS.BANK_TRANSFER}
                            onChange={onChange}
                        >
                            Bank Transfer
                        </Radio>
                    </FormGroup>

                    <div className={css.actions}>
                        <Button
                            type="submit"
                            bsStyle="success"
                        >
                            {saving ? 'Completing Gift...' : 'Complete Gift'}
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
            </div>
        </section>
    );
}
