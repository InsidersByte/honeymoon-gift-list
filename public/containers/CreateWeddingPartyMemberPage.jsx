/* @flow */

import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/weddingPartyMember';
import { WEDDING_PARTY_MEMBERS_ROUTE } from '../constants/routes';
import WeddingPartyMemberForm from '../components/WeddingPartyMemberForm';

type PropsType = {
    saving: boolean,
    actions: {
        createWeddingPartyMember: Function,
    },
    router: {
        push: Function,
    },
};

@withRouter
@connect(
    ({ weddingPartyMember }) => weddingPartyMember,
    dispatch => ({ actions: bindActionCreators(actions, dispatch) })
)
export default class CreateWeddingPartyMemberPage extends Component {
    props: PropsType;

    state = {
        member: {
            name: '',
            title: '',
            imageUrl: '',
            description: '',
        },
    };

    onChange = ({ target: { name, value } }: { target: { name: string, value: string } }) => {
        const member = Object.assign(this.state.member, { [name]: value });
        this.setState({ member });
    };

    onSubmit = (event: SyntheticEvent) => {
        event.preventDefault();

        const { actions: { createWeddingPartyMember } } = this.props;
        const { member } = this.state;

        createWeddingPartyMember(member);
    };

    onBack = (event: SyntheticEvent) => {
        event.preventDefault();

        this.props.router.push(WEDDING_PARTY_MEMBERS_ROUTE);
    };

    render() {
        const { saving } = this.props;
        const { member } = this.state;

        return (
            <WeddingPartyMemberForm
                member={member}
                title="Create"
                loading={false}
                saving={saving}
                onChange={this.onChange}
                onSubmit={this.onSubmit}
                onBack={this.onBack}
            />
        );
    }
}

