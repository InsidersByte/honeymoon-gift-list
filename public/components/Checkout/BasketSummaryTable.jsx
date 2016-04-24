import React from 'react';
import { Table } from 'react-bootstrap';
import BasketSummaryRow from './BasketSummaryRow';

function BasketSummaryTable(props) {
    return (
        <Table responsive className="basket-summary__table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Price (£)</th>
                    <th>Quantity</th>
                    <th>Remaining</th>
                    <th>Remove</th>
                </tr>
            </thead>

            <tbody>
            {
                [...props.items.entries()].map(([key, item]) => (
                    <BasketSummaryRow
                        key={key}
                        item={item}
                        onAdd={props.onAdd}
                        onRemove={props.onRemove}
                        onDelete={props.onDelete}
                    />
                ))
            }
            </tbody>
        </Table>
    );
}

BasketSummaryTable.propTypes = {
    items: React.PropTypes.object.isRequired,
    total: React.PropTypes.number.isRequired,
    onAdd: React.PropTypes.func.isRequired,
    onRemove: React.PropTypes.func.isRequired,
    onDelete: React.PropTypes.func.isRequired,
};

export default BasketSummaryTable;
