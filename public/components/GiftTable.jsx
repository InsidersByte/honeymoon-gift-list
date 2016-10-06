import React from 'react';
import { Table } from 'react-bootstrap';

export default function GiftTable({ gifts }) {
    return (
        <Table striped bordered condensed hover responsive>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Price (£)</th>
                    <th>Quantity</th>
                    <th>Total (£)</th>
                </tr>
            </thead>

            <tbody>
                {gifts
                    .map(gift =>
                        <tr>
                            <th>{gift.honeymoonGiftListItem.name}</th>
                            <th>{gift.price}</th>
                            <th>{gift.quantity}</th>
                            <th>{gift.total}</th>
                        </tr>
                    )
                }
            </tbody>
        </Table>
    );
}

GiftTable.propTypes = {
    gifts: React.PropTypes.arrayOf(React.PropTypes.shape({})).isRequired,
};

GiftTable.defaultProps = {
    gifts: [],
};
