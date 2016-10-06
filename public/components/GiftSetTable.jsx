/* @flow */

import React from 'react';
import { Table } from 'react-bootstrap';
import Loader from './Loader';
import GiftSetRow from './GiftSetRow';

type PropsType = {
    loading: boolean,
    total: number,
    giftSets: Array<{
        id: number,
        giver: {
            forename: string,
            surname: string,
            email: string,
            phoneNumber: string,
        },
        createdAt: string,
        total: number,
        paid: boolean,
        paymentDetailsSent: boolean,
        paymentMethod: string,
    }>,
    onMarkAsPaid: Function,
    onMarkAsDetailsSent: Function,
    onDelete: Function,
    onSelect: Function,
};

export default function GiftSetTable({ giftSets, total, loading, onMarkAsPaid, onMarkAsDetailsSent, onDelete, onSelect }: PropsType) {
    return (
        <Loader loading={loading}>
            <div style={{ display: 'inline-block' }}>
                <h1 style={{ display: 'inline-block' }}>Gift Sets</h1>
                &nbsp;({giftSets.length} Gift Sets totalling £{total})
            </div>

            <Table striped bordered condensed hover responsive>
                <thead>
                    <tr>
                        <th>Giver Name</th>
                        <th>Giver Email</th>
                        <th>Giver Phone Number</th>
                        <th>Total (£)</th>
                        <th>Payment Method</th>
                        <th>Date</th>
                        <th>Paid?</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {giftSets
                        .map(giftSet =>
                            <GiftSetRow
                                key={giftSet.id}
                                giftSet={giftSet}
                                onMarkAsPaid={onMarkAsPaid}
                                onMarkAsDetailsSent={onMarkAsDetailsSent}
                                onDelete={onDelete}
                                onSelect={onSelect}
                            />
                        )
                    }
                </tbody>
            </Table>
        </Loader>
    );
}
