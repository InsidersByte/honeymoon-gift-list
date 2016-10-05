/* @flow */

import React from 'react';
import moment from 'moment';
import { ButtonToolbar, Button } from 'react-bootstrap';
import FontAwesome from './FontAwesome';

type PropsType = {
    giftSet: {
        giver: {
            forename: string,
            surname: string,
            email: string,
            phoneNumber: string,
        },
        createdAt: string,
        total: number,
        paid: boolean,
        detailsSent: boolean,
        paymentMethod: string,
    },
    onDelete: Function,
    onMarkAsPaid: Function,
    onMarkAsDetailsSent: Function,
    onSelect: Function,
};

export default class GiftSetRow extends React.Component {
    props: PropsType;

    onDelete = () => {
        this.props.onDelete(this.props.giftSet);
    };

    onMarkAsPaid = () => {
        this.props.onMarkAsPaid(this.props.giftSet);
    };

    onMarkAsDetailsSent = () => {
        this.props.onMarkAsDetailsSent(this.props.giftSet);
    };

    onSelect = () => {
        this.props.onSelect(this.props.giftSet);
    };

    render() {
        const { giftSet: { giver, createdAt, total, paid, detailsSent, paymentMethod } } = this.props;
        const { forename, surname, email, phoneNumber } = giver;

        const createdAtMoment = moment(createdAt);
        const createdAtFormatted = createdAtMoment.format('DD/MM/YY HH:MM');

        return (
            <tr>
                <th>{forename} {surname}</th>
                <th>{email}</th>
                <th>{phoneNumber}</th>
                <th>{total}</th>
                <th>{paymentMethod}</th>
                <th>{createdAtFormatted}</th>
                <th>{paid ? 'Yes' : 'No'}</th>
                <th>
                    <ButtonToolbar>
                        <Button
                            bsSize="xsmall"
                            bsStyle="primary"
                            onClick={this.onSelect}
                        >
                            <FontAwesome icon="eye" />
                        </Button>

                        <Button
                            bsSize="xsmall"
                            bsStyle="success"
                            onClick={this.onMarkAsDetailsSent}
                            disabled={detailsSent || paid}
                        >
                            <FontAwesome icon="send" />
                        </Button>

                        <Button
                            bsSize="xsmall"
                            bsStyle="success"
                            onClick={this.onMarkAsPaid}
                            disabled={paid}
                        >
                            <FontAwesome icon="gbp" />
                        </Button>

                        <Button
                            bsSize="xsmall"
                            bsStyle="danger"
                            onClick={this.onDelete}
                            disabled={paid}
                        >
                            <FontAwesome icon="trash" />
                        </Button>
                    </ButtonToolbar>
                </th>
            </tr>
        );
    }
}
