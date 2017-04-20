/* @flow */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import type { Connector } from 'react-redux';
import type { Match } from 'react-router-dom';
import * as actions from '../../actions/giftSet';
import Confirmation from '../../components/Confirmation';
import type { StateType, DispatchType, GiftSetType } from '../../types';

type PropsType = {
  loading: boolean,
  giftSet: GiftSetType,
  actions: {
    loadGiftSet: (giftSetId: string) => void,
  },
  match: Match,
};

type LocalStateType = {
  linkClicked: boolean,
};

const mapStateToProps = ({ giftSet }: StateType) => giftSet;
const mapDispatchToProps = (dispatch: DispatchType) => ({ actions: bindActionCreators(actions, dispatch) });

export class ConfirmationPage extends Component<void, PropsType, LocalStateType> {
  state = { linkClicked: false };

  componentDidMount() {
    this.props.actions.loadGiftSet(this.props.match.params.giftSetId);
  }

  onLinkClicked = () => {
    this.setState({ linkClicked: true });
  };

  render() {
    const { loading, giftSet } = this.props;
    const { linkClicked } = this.state;

    return <Confirmation loading={loading} giftSet={giftSet} onLinkClicked={this.onLinkClicked} linkClicked={linkClicked} />;
  }
}

const connector: Connector<PropsType, PropsType> = connect(mapStateToProps, mapDispatchToProps);

export default connector(ConfirmationPage);
