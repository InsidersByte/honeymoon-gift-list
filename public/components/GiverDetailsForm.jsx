/* @flow */

import React from 'react';
import { Link } from 'react-router';
import { Paper, Toolbar, ToolbarGroup, ToolbarTitle, TextField, RaisedButton, RadioButton, RadioButtonGroup } from 'material-ui';
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
    onRadioChange: Function,
    onSubmit: Function,
};

const styles = {
    form: {
        padding: '30px 50px',
        marginBottom: 10,
    },
    input: {
        margin: '6px 0',
    },
    radioButton: {
        marginTop: 16,
        marginBottom: 16,
    },
    button: {
        marginTop: 12,
        marginRight: 12,
    },
};

export default function GiverDetailsForm({
    giver: { forename, surname, email, phoneNumber, paymentMethod }, saving, onChange, onRadioChange, onSubmit,
}: PropsType) {
    return (
        <section className={css.root}>
            <div className={css.container}>
                <Paper>
                    <Toolbar>
                        <ToolbarGroup>
                            <ToolbarTitle text="Your Details" />
                        </ToolbarGroup>
                    </Toolbar>

                    <Form onSubmit={onSubmit} loading={false} saving={saving} style={styles.form}>
                        <TextField
                            name="forename"
                            floatingLabelText="Forename"
                            value={forename}
                            onChange={onChange}
                            fullWidth
                            style={styles.input}
                            disabled={saving}
                            required
                        />

                        <TextField
                            name="surname"
                            floatingLabelText="Surname"
                            value={surname}
                            onChange={onChange}
                            fullWidth
                            style={styles.input}
                            disabled={saving}
                            required
                        />

                        <TextField
                            name="email"
                            type="email"
                            floatingLabelText="Email"
                            value={email}
                            onChange={onChange}
                            fullWidth
                            style={styles.input}
                            disabled={saving}
                            required
                        />

                        <TextField
                            name="phoneNumber"
                            floatingLabelText="Telephone Number"
                            value={phoneNumber}
                            onChange={onChange}
                            fullWidth
                            style={styles.input}
                            disabled={saving}
                            required
                        />

                        <RadioButtonGroup name="paymentMethod" valueSelected={paymentMethod} onChange={onRadioChange}>
                            <RadioButton
                                label="PayPal"
                                value={PAYMENT_METHODS.PAYPAL}
                                disabled={saving}
                                style={styles.radioButton}
                            />

                            <RadioButton
                                label="Bank Transfer"
                                value={PAYMENT_METHODS.BANK_TRANSFER}
                                disabled={saving}
                                style={styles.radioButton}
                            />
                        </RadioButtonGroup>

                        <div className={css.actions}>
                            <RaisedButton
                                primary
                                type="submit"
                                label={saving ? 'Completing Gift...' : 'Complete Gift'}
                                disabled={saving}
                                style={styles.button}
                            />

                            <RaisedButton
                                label="Back to Basket"
                                linkButton
                                containerElement={<Link to={BASKET_ROUTE}>Back to Basket</Link>}
                                disabled={saving}
                                style={styles.button}
                            />
                        </div>
                    </Form>
                </Paper>
            </div>
        </section>
    );
}
