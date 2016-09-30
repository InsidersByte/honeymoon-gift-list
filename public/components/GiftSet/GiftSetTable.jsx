import React from 'react';
import { Table } from 'react-bootstrap';
import GiftSetRow from './GiftSetRow';

export default function GiftSetTable({ giftSets, onMarkAsPaid, onMarkAsDetailsSent, onDelete, onSelect }) {
    return (
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
    );
}

GiftSetTable.propTypes = {
    giftSets: React.PropTypes.arrayOf(React.PropTypes.shape({})).isRequired,
    onDelete: React.PropTypes.func.isRequired,
    onMarkAsPaid: React.PropTypes.func.isRequired,
    onMarkAsDetailsSent: React.PropTypes.func.isRequired,
    onSelect: React.PropTypes.func.isRequired,
};

GiftSetTable.defaultProps = {
    giftSets: [],
};
