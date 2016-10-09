import React from 'react';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow } from 'material-ui/Table';
import BasketSummaryRow from './BasketSummaryRow';

type PropsType = {
    basket: Map,
    addToBasket: Function,
    removeFromBasket: Function,
    deleteFromBasket: Function,
};

export default function BasketSummaryTable({ basket, addToBasket, removeFromBasket, deleteFromBasket }: PropsType) {
    return (
        <Table>
            <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                <TableRow>
                    <TableHeaderColumn>Name</TableHeaderColumn>
                    <TableHeaderColumn>Price (£)</TableHeaderColumn>
                    <TableHeaderColumn>Quantity</TableHeaderColumn>
                    <TableHeaderColumn>Remaining</TableHeaderColumn>
                    <TableHeaderColumn>Remove</TableHeaderColumn>
                </TableRow>
            </TableHeader>

            <TableBody displayRowCheckbox={false}>
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
            </TableBody>
        </Table>
    );
}
