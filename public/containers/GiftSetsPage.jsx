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

  state = {
    canView: false,
    canDelete: false,
    canMarkAsDetailsSent: false,
    canMarkAsPaid: false,
    selectedGiftSets: [],
    selectedGiftSet: undefined,
  };

  componentDidMount() {
    this.props.actions.loadGiftSets();
  }

  // FIXME: This seems like a bit of a hack
  componentWillReceiveProps({ saving: nextSaving, deleting: nextDeleting }: PropsType) {
    const { saving, deleting, actions: { loadGiftSets } } = this.props;

    if (deleting && !nextDeleting) {
      this.setState({ selectedGiftSet: undefined, selectedGiftSets: [] });
      loadGiftSets();
    }

    if (saving && !nextSaving) {
      loadGiftSets();
    }
  }

  onView = () => {
    const { selectedGiftSet } = this.state;

    if (!selectedGiftSet) {
      // TODO: error?
      return;
    }

    this.props.router.push(giftSetRoute(selectedGiftSet.id));
  };

  onMarkAsDetailsSent = () => {
    const { selectedGiftSet } = this.state;

    if (!selectedGiftSet) {
      // TODO: error?
      return;
    }

    if (!confirm('Are you sure you want to mark this gift set as details sent?')) {
      return;
    }

    this.props.actions.markGiftSetAsDetailsSent(selectedGiftSet);
  };

  onMarkAsPaid = () => {
    const { selectedGiftSet } = this.state;

    if (!selectedGiftSet) {
      // TODO: error?
      return;
    }

    if (!confirm('Are you sure you want to mark this gift set as paid?')) {
      return;
    }

    this.props.actions.markGiftSetAsPaid(selectedGiftSet);
  };

  onDelete = () => {
    const { selectedGiftSet } = this.state;

    if (!selectedGiftSet) {
      // TODO: error?
      return;
    }

    if (!confirm('Are you sure you want to delete this gift set?')) {
      return;
    }

    this.props.actions.deleteGiftSet(selectedGiftSet);
  };

  onSelect = (selectedGiftSets: Array<number>) => {
    if (selectedGiftSets.length !== 1) {
      this.setState({
        selectedGiftSets,
        selectedGiftSet: undefined,
        canView: false,
        canDelete: false,
        canMarkAsDetailsSent: false,
        canMarkAsPaid: false,
      });
    }

    const [index] = selectedGiftSets;
    const { giftSets } = this.props;
    const selectedGiftSet = giftSets[index];
    const { paid, paymentDetailsSent } = selectedGiftSet;

    const canDelete = !paid;
    const canMarkAsDetailsSent = !paid && !paymentDetailsSent;
    const canMarkAsPaid = !paid;

    this.setState({ selectedGiftSets, selectedGiftSet, canView: true, canDelete, canMarkAsDetailsSent, canMarkAsPaid });
  };

  render() {
    const { loading, giftSets, total } = this.props;
    const { selectedGiftSets, canView, canDelete, canMarkAsDetailsSent, canMarkAsPaid } = this.state;

    return (
      <GiftSetTable
        loading={loading}
        giftSets={giftSets}
        selectedGiftSets={selectedGiftSets}
        total={total}
        canView={canView}
        canDelete={canDelete}
        canMarkAsDetailsSent={canMarkAsDetailsSent}
        canMarkAsPaid={canMarkAsPaid}
        onSelect={this.onSelect}
        onView={this.onView}
        onMarkAsPaid={this.onMarkAsPaid}
        onMarkAsDetailsSent={this.onMarkAsDetailsSent}
        onDelete={this.onDelete}
      />
    );
  }
}
