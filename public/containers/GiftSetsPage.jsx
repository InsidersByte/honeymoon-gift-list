/* @flow */

import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/giftSet';
import { giftSetRoute } from '../constants/routes';
import GiftSetTable from '../components/GiftSetTable';

type PropsType = {
    loading: boolean,
    saving: boolean,
    deleting: boolean,
    total: number,
    giftSets: Array<{}>,
    actions: {
        loadGiftSets: Function,
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
    ({ giftSets: { giftSets, ...state } }) => {
        const total = giftSets.reduce((a, b) => a + b.total, 0);

        return {
            ...state,
            giftSets,
            total,
        };
    },
    dispatch => ({ actions: bindActionCreators(actions, dispatch) })
)
export default class GiftSetsPage extends React.Component {
    props: PropsType;

    componentDidMount() {
        this.props.actions.loadGiftSets();
    }

    // TODO: This seems like a bit of a hack
    componentWillReceiveProps({ saving: nextSaving, deleting: nextDeleting }: PropsType) {
        const { saving, deleting, actions: { loadUsers } } = this.props;

        if (deleting && !nextDeleting) {
            loadUsers();
        }

        if (saving && !nextSaving) {
            loadUsers();
        }
    }

    markAsDetailsSent = (giftSet: Object) => {
        if (!confirm('Are you sure you want to mark this gift set as details sent?')) {
            return;
        }

        this.props.actions.markGiftSetAsDetailsSent(giftSet);
    };

    markAsPaid = (giftSet: Object) => {
        if (!confirm('Are you sure you want to mark this gift set as paid?')) {
            return;
        }

        this.props.actions.markGiftSetAsPaid(giftSet);
    };

    delete = (giftSet: Object) => {
        if (!confirm('Are you sure you want to delete this gift set?')) {
            return;
        }

        this.props.actions.deleteGiftSet(giftSet);
    };

    view = ({ id }: Object) => {
        this.props.router.push(giftSetRoute(id));
    };

    render() {
        const { loading, giftSets, total } = this.props;

        return (
            <GiftSetTable
                loading={loading}
                giftSets={giftSets}
                total={total}
                onMarkAsPaid={this.markAsPaid}
                onMarkAsDetailsSent={this.markAsDetailsSent}
                onDelete={this.delete}
                onSelect={this.view}
            />
        );
    }
}
