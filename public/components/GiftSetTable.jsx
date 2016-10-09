/* @flow */

import React from 'react';
import {
    Paper, Toolbar, ToolbarGroup, ToolbarTitle, Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn, IconButton,
} from 'material-ui';
import Mail from 'material-ui/svg-icons/content/mail';
import View from 'material-ui/svg-icons/action/pageview';
import Sent from 'material-ui/svg-icons/content/send';
import Paid from 'material-ui/svg-icons/editor/attach-money';
import Delete from 'material-ui/svg-icons/action/delete';
import moment from 'moment';
import Loader from './Loader';

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
    selectedGiftSets: Array<number>,
    canView: boolean,
    canDelete: boolean,
    canMarkAsDetailsSent: boolean,
    onSelect: Function,
    onView: Function,
    canMarkAsPaid: boolean,
    onMarkAsPaid: Function,
    onMarkAsDetailsSent: Function,
    onDelete: Function,
};

export default function GiftSetTable({
    giftSets, selectedGiftSets, total, loading, onSelect, canView, canDelete, canMarkAsDetailsSent, canMarkAsPaid, onView, onMarkAsPaid,
    onMarkAsDetailsSent, onDelete,
}: PropsType) {
    return (
        <Loader loading={loading}>
            <Paper>
                <Toolbar>
                    <ToolbarGroup>
                        <ToolbarTitle text="Gift Sets" />
                    </ToolbarGroup>

                    <ToolbarGroup>
                        <ToolbarTitle text={`${giftSets.length} Gift Sets totalling £${total}`} />
                    </ToolbarGroup>
                </Toolbar>

                <Table onRowSelection={onSelect}>
                    <TableHeader displaySelectAll={false}>
                        <TableRow>
                            <TableHeaderColumn colSpan="7" style={{ textAlign: 'right' }}>
                                <IconButton disabled={!canView} tooltip="View" onClick={onView}><View /></IconButton>
                                <IconButton disabled={!canMarkAsDetailsSent} tooltip="Mark as Details Sent" onClick={onMarkAsDetailsSent}><Sent /></IconButton>
                                <IconButton disabled={!canMarkAsPaid} tooltip="Mark as Paid" onClick={onMarkAsPaid}><Paid /></IconButton>
                                <IconButton disabled={!canDelete} tooltip="Delete" onClick={onDelete}><Delete /></IconButton>
                            </TableHeaderColumn>
                        </TableRow>

                        <TableRow>
                            <TableHeaderColumn>Giver Name</TableHeaderColumn>
                            <TableHeaderColumn>Giver Email</TableHeaderColumn>
                            <TableHeaderColumn>Giver Phone Number</TableHeaderColumn>
                            <TableHeaderColumn>Total (£)</TableHeaderColumn>
                            <TableHeaderColumn>Payment Method</TableHeaderColumn>
                            <TableHeaderColumn>Date</TableHeaderColumn>
                            <TableHeaderColumn>Status</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>

                    <TableBody deselectOnClickaway={false}>
                        {giftSets
                            .map((giftSet, index) => {
                                // FIXME: Material-ui doesn't seem to like this in another component
                                const { id, giver, createdAt, total: giftSetTotal, paid, paymentDetailsSent, paymentMethod } = giftSet;
                                const { forename, surname, email, phoneNumber } = giver;

                                const createdAtMoment = moment(createdAt);
                                const createdAtFormatted = createdAtMoment.format('DD/MM/YY HH:MM');
                                const selected = selectedGiftSets.includes(index);

                                let statusIcon;

                                if (paid) {
                                    statusIcon = <Paid />;
                                } else if (paymentDetailsSent) {
                                    statusIcon = <Sent />;
                                } else {
                                    statusIcon = <Mail />;
                                }

                                return (
                                    <TableRow key={id} selected={selected}>
                                        <TableRowColumn>{forename} {surname}</TableRowColumn>
                                        <TableRowColumn>{email}</TableRowColumn>
                                        <TableRowColumn>{phoneNumber}</TableRowColumn>
                                        <TableRowColumn>{giftSetTotal}</TableRowColumn>
                                        <TableRowColumn>{paymentMethod}</TableRowColumn>
                                        <TableRowColumn>{createdAtFormatted}</TableRowColumn>
                                        <TableRowColumn>{statusIcon}</TableRowColumn>
                                    </TableRow>
                                );
                            })
                        }
                    </TableBody>
                </Table>
            </Paper>
        </Loader>
    );
}
