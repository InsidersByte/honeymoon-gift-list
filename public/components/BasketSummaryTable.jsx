import React from 'react';
import { Table } from 'react-bootstrap';
import BasketSummaryRow from './BasketSummaryRow';

type PropsType = {
    basket: Map,
    addToBasket: Function,
    removeFromBasket: Function,
    deleteFromBasket: Function,
};

export default function BasketSummaryTable({ basket, addToBasket, removeFromBasket, deleteFromBasket }: PropsType) {
    return (
        <Table responsive>
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
                    [...basket.entries()].map(([key, item]) =>
                        <BasketSummaryRow
                            key={key}
                            item={item}
                            addToBasket={addToBasket}
                            removeFromBasket={removeFromBasket}
                            deleteFromBasket={deleteFromBasket}
                        />
                    )
                }
            </tbody>
        </Table>
    );
}
