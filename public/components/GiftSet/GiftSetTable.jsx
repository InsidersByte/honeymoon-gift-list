import React from 'react';
import { Table } from 'react-bootstrap';
import GiftSetRow from './GiftSetRow';

function GiftSetTable(props) {
    return (
        <Table striped bordered condensed hover responsive>
            <thead>
                <tr>
                    <th>Giver Name</th>
                    <th>Giver Email</th>
                    <th>Giver Phone Number</th>
                    <th>Total (£)</th>
                    <th>Date</th>
                    <th>Paid?</th>
                    <th>Actions</th>
                </tr>
            </thead>

            <tbody>
                {props
                    .giftSets
                    .map(giftSet => (
                        <GiftSetRow
                            key={giftSet._id} // eslint-disable-line no-underscore-dangle
                            giftSet={giftSet}
                            onMarkAsPaid={props.onMarkAsPaid}
                            onMarkAsDetailsSent={props.onMarkAsDetailsSent}
                            onDelete={props.onDelete}
                            onSelect={props.onSelect}
                        />
                    ))
                }
            </tbody>
        </Table>
    );
}

GiftSetTable.propTypes = {
    giftSets: React.PropTypes.array.isRequired,
    onDelete: React.PropTypes.func.isRequired,
    onMarkAsPaid: React.PropTypes.func.isRequired,
    onMarkAsDetailsSent: React.PropTypes.func.isRequired,
    onSelect: React.PropTypes.func.isRequired,
};

GiftSetTable.defaultProps = {
    giftSets: [],
};

export default GiftSetTable;
