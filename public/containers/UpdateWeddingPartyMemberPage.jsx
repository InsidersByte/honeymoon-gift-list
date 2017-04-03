/* @flow */

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/weddingPartyMember';
import WeddingPartyMemberForm from '../components/WeddingPartyMemberForm';

type PropsType = {
  weddingPartyMember: {
    id: number,
    name: string,
    title: string,
    imageUrl: string,
    description: string,
  },
  loading: boolean,
  saving: boolean,
  params: {
    id: string,
  },
  actions: {
    loadWeddingPartyMember: Function,
    updateWeddingPartyMember: Function,
  },
};

@connect(({ weddingPartyMember }) => weddingPartyMember, dispatch => ({ actions: bindActionCreators(actions, dispatch) }))
export default class UpdateWeddingPartyMemberPage extends React.Component {
  props: PropsType;

  state = {
    weddingPartyMember: this.props.weddingPartyMember,
  };

  componentDidMount() {
    const { params: { id }, actions: { loadWeddingPartyMember } } = this.props;
    loadWeddingPartyMember(id);
  }

  componentWillReceiveProps({ weddingPartyMember }: PropsType) {
    if (weddingPartyMember.id !== this.state.weddingPartyMember.id) {
      this.setState({ weddingPartyMember: { ...weddingPartyMember } });
    }
  }

  onChange = ({ target: { name, value } }: { target: { name: string, value: string } }) => {
    const weddingPartyMember = Object.assign(this.state.weddingPartyMember, { [name]: value });
    this.setState({ weddingPartyMember });
  };

  onSubmit = (event: SyntheticEvent) => {
    event.preventDefault();

    const { actions: { updateWeddingPartyMember } } = this.props;
    const { weddingPartyMember } = this.state;

    updateWeddingPartyMember(weddingPartyMember);
  };

  render() {
    const { loading, saving } = this.props;
    const { weddingPartyMember } = this.state;

    return (
      <WeddingPartyMemberForm
        weddingPartyMember={weddingPartyMember}
        title="Update"
        loading={loading}
        saving={saving}
        onChange={this.onChange}
        onSubmit={this.onSubmit}
      />
    );
  }
}
