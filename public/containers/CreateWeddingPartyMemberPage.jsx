/* @flow */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/weddingPartyMember';
import WeddingPartyMemberForm from '../components/WeddingPartyMemberForm';

type PropsType = {
  saving: boolean,
  actions: {
    createWeddingPartyMember: Function,
  },
};

@connect(({ weddingPartyMember }) => weddingPartyMember, dispatch => ({ actions: bindActionCreators(actions, dispatch) }))
export default class CreateWeddingPartyMemberPage extends Component {
  props: PropsType;

  state = {
    weddingPartyMember: {
      name: '',
      title: '',
      imageUrl: '',
      description: '',
    },
  };

  onChange = ({ target: { name, value } }: { target: { name: string, value: string } }) => {
    const weddingPartyMember = Object.assign(this.state.weddingPartyMember, { [name]: value });
    this.setState({ weddingPartyMember });
  };

  onSubmit = (event: SyntheticEvent) => {
    event.preventDefault();

    const { actions: { createWeddingPartyMember } } = this.props;
    const { weddingPartyMember } = this.state;

    createWeddingPartyMember(weddingPartyMember);
  };

  render() {
    const { saving } = this.props;
    const { weddingPartyMember } = this.state;

    return (
      <WeddingPartyMemberForm
        weddingPartyMember={weddingPartyMember}
        title="Create"
        loading={false}
        saving={saving}
        onChange={this.onChange}
        onSubmit={this.onSubmit}
      />
    );
  }
}
