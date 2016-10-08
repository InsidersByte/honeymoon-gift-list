/* @flow */

import React from 'react';
import { Paper, Toolbar, ToolbarGroup, ToolbarTitle, TextField, RaisedButton } from 'material-ui';
import { Link } from 'react-router';
import { GIFT_SETS_ROUTE } from '../constants/routes';
import Loader from './Loader';
import GiftTable from './GiftTable';

type PropsType = {
    giftSet: {
        id: number,
        giver: {
            fullName: string,
            forename: string,
            surname: string,
            email: string,
            phoneNumber: string,
        },
        gifts: Array<{
            name: string,
            price: number,
            quantity: number,
            total: number,
        }>,
        createdAt: string,
        createdAtFormatted: string,
        total: number,
        paid: boolean,
        paymentDetailsSent: boolean,
        paymentMethod: string,
    },
    loading: boolean,
    saving: boolean,
    canDelete: boolean,
    canMarkAsDetailsSent: boolean,
    canMarkAsPaid: boolean,
    onMarkAsDetailsSent: Function,
    onMarkAsPaid: Function,
    onDelete: Function,
};

const styles = {
    form: {
        padding: '30px 50px',
        marginBottom: 10,
    },
    input: {
        margin: '6px 0',
    },
    button: {
        marginTop: 12,
        marginRight: 12,
    },
};

export default function GiftSet({
    giftSet: { total, paid, createdAtFormatted, gifts, giver: { fullName, email, phoneNumber } }, loading, saving,
    canDelete, canMarkAsDetailsSent, canMarkAsPaid, onMarkAsDetailsSent, onMarkAsPaid, onDelete,
}: PropsType) {
    return (
        <Loader loading={loading}>
            <Paper>
                <Toolbar>
                    <ToolbarGroup>
                        <ToolbarTitle text="Gift Set" />
                    </ToolbarGroup>
                </Toolbar>

                <div style={styles.form}>
                    <TextField
                        id="fullName"
                        value={fullName}
                        floatingLabelText="Full Name"
                        fullWidth
                        style={styles.input}
                        disabled
                    />

                    <TextField
                        id="email"
                        value={email}
                        floatingLabelText="Email"
                        fullWidth
                        style={styles.input}
                        disabled
                    />

                    <TextField
                        id="phoneNumber"
                        value={phoneNumber}
                        floatingLabelText="Phone Number"
                        fullWidth
                        style={styles.input}
                        disabled
                    />

                    <TextField
                        id="date"
                        value={createdAtFormatted}
                        floatingLabelText="Gift Date"
                        fullWidth
                        style={styles.input}
                        disabled
                    />

                    <TextField
                        id="total"
                        value={total}
                        floatingLabelText="Total (£)"
                        fullWidth
                        style={styles.input}
                        disabled
                    />

                    <TextField
                        id="paid"
                        value={paid ? 'Yes' : 'No'}
                        floatingLabelText="Paid"
                        fullWidth
                        style={styles.input}
                        disabled
                    />

                    <GiftTable gifts={gifts} />

                    <RaisedButton
                        label="Back"
                        primary
                        containerElement={<Link to={GIFT_SETS_ROUTE}>Back</Link>}
                        linkButton
                        disabled={saving}
                        style={styles.button}
                    />

                    <RaisedButton
                        label="Mark As Payment Details Sent"
                        secondary
                        onClick={onMarkAsDetailsSent}
                        disabled={!canMarkAsDetailsSent || saving}
                        style={styles.button}
                    />

                    <RaisedButton
                        label="Mark As Paid"
                        secondary
                        onClick={onMarkAsPaid}
                        disabled={!canMarkAsPaid || saving}
                        style={styles.button}
                    />

                    <RaisedButton
                        label="Delete"
                        onClick={onDelete}
                        disabled={!canDelete || saving}
                        style={styles.button}
                    />
                </div>
            </Paper>
        </Loader>
    );
}
