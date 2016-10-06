/* @flow */

import React from 'react';
import { withRouter } from 'react-router';
import moment from 'moment';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/giftSet';
import { GIFT_SETS_ROUTE } from '../constants/routes';
import GiftSet from '../components/GiftSet';

type PropsType = {
    giftSet: {
        id: number,
        giver: {
            fullName: string,
            forename: string,
            surname: string,
            email: string,
            phoneNumber: string,
        },
        createdAt: string,
        createdAtFormatted: string,
        total: number,
        paid: boolean,
        paymentDetailsSent: boolean,
        paymentMethod: string,
    },
    loading: boolean,
    saving: boolean,
    deleting: boolean,
    canDelete: boolean,
    canMarkAsDetailsSent: boolean,
    canMarkAsPaid: boolean,
    params: {
        giftSetId: string,
    },
    actions: {
        loadGiftSet: Function,
        deleteGiftSet: Function,
        markGiftSetAsDetailsSent: Function,
        markGiftSetAsPaid: Function,
    },
    router: {
        push: Function,
    },
};

@withRouter
@connect(
    ({ giftSet: { giftSet, ...state } }) => {
        const { createdAt, paid, paymentDetailsSent } = giftSet;
        const createdAtMoment = moment(createdAt);
        const createdAtFormatted = createdAtMoment.format('DD/MM/YY HH:MM');

        const canDelete = !paid;
        const canMarkAsDetailsSent = !paid && !paymentDetailsSent;
        const canMarkAsPaid = !paid;

        const updatedGiftSet = Object.assign({}, giftSet, { createdAtFormatted });

        return {
            ...state,
            canDelete,
            canMarkAsDetailsSent,
            canMarkAsPaid,
            giftSet: updatedGiftSet,
        };
    },
    dispatch => ({ actions: bindActionCreators(actions, dispatch) })
)
export default class GiftSetPage extends React.Component {
    props: PropsType;

    componentDidMount() {
        const { params: { giftSetId }, actions: { loadGiftSet } } = this.props;
        loadGiftSet(giftSetId);
    }

    // FIXME: This seems like a bit of a hack
    componentWillReceiveProps({ deleting: nextDeleting }: PropsType) {
        const { deleting } = this.props;

        if (deleting && !nextDeleting) {
            this.props.router.push(GIFT_SETS_ROUTE);
        }
    }

    onMarkAsDetailsSent = () => {
        if (!confirm('Are you sure you want to mark this gift set as details sent?')) {
            return;
        }

        const { giftSet, actions: { markGiftSetAsDetailsSent } } = this.props;
        markGiftSetAsDetailsSent(giftSet);
    };

    onMarkAsPaid = () => {
        if (!confirm('Are you sure you want to mark this gift as paid?')) {
            return;
        }

        const { giftSet, actions: { markGiftSetAsPaid } } = this.props;
        markGiftSetAsPaid(giftSet);
    };

    onDelete = () => {
        if (!confirm('Are you sure you want to delete this gift set?')) {
            return;
        }

        const { giftSet, actions: { deleteGiftSet } } = this.props;
        deleteGiftSet(giftSet);
    };

    onBack = () => {
        this.props.router.push(GIFT_SETS_ROUTE);
    };

    render() {
        const { giftSet, loading, saving, deleting, canDelete, canMarkAsDetailsSent, canMarkAsPaid } = this.props;
        const working = saving || deleting;

        return (
            <GiftSet
                giftSet={giftSet}
                loading={loading}
                saving={working}
                canDelete={canDelete}
                canMarkAsDetailsSent={canMarkAsDetailsSent}
                canMarkAsPaid={canMarkAsPaid}
                onMarkAsDetailsSent={this.onMarkAsDetailsSent}
                onMarkAsPaid={this.onMarkAsPaid}
                onDelete={this.onDelete}
                onBack={this.onBack}
            />
        );
    }
}
