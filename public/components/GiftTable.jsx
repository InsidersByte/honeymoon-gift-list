/* @flow */

import React from 'react';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';

type PropsType = {
    gifts: Array<{
        name: string,
        price: number,
        quantity: number,
        total: number,
    }>,
};

export default function GiftTable({ gifts }: PropsType) {
    return (
        <div>
            <h2>Gifts</h2>

            <Table selectable={false}>
                <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
                    <TableRow>
                        <TableHeaderColumn>Name</TableHeaderColumn>
                        <TableHeaderColumn>Price (£)</TableHeaderColumn>
                        <TableHeaderColumn>Quantity</TableHeaderColumn>
                        <TableHeaderColumn>Total (£)</TableHeaderColumn>
                    </TableRow>
                </TableHeader>

                <TableBody displayRowCheckbox={false}>
                    {gifts
                        .map(gift =>
                            <TableRow>
                                <TableRowColumn>{gift.name}</TableRowColumn>
                                <TableRowColumn>{gift.price}</TableRowColumn>
                                <TableRowColumn>{gift.quantity}</TableRowColumn>
                                <TableRowColumn>{gift.total}</TableRowColumn>
                            </TableRow>
                        )
                    }
                </TableBody>
            </Table>
        </div>
    );
}
