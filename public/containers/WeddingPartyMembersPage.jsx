/* @flow */

import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/weddingPartyMember';
import { CREATE_WEDDING_PARTY_MEMBER_ROUTE, updateWeddingPartyMemberRoute } from '../constants/routes';
import WeddingPartyMembersList from '../components/WeddingPartyMemberList';

type PropsType = {
    weddingPartyMembers: Array<Object>,
    loading: boolean,
    deleting: boolean,
    actions: {
        loadWeddingPartyMembers: Function,
        updateWeddingPartyMember: Function,
        deleteWeddingPartyMember: Function,
    },
    router: {
        push: Function,
    },
};

@withRouter
@connect(
    ({ weddingPartyMembers }) => weddingPartyMembers,
    dispatch => ({ actions: bindActionCreators(actions, dispatch) })
)
export default class WeddingPartyMembersPage extends React.Component {
    props: PropsType;

    componentDidMount() {
        this.props.actions.loadWeddingPartyMembers();
    }

    // TODO: This seems like a bit of a hack
    componentWillReceiveProps({ deleting: nextDeleting }: PropsType) {
        const { deleting, actions: { loadWeddingPartyMembers } } = this.props;

        if (deleting && !nextDeleting) {
            loadWeddingPartyMembers();
        }
    }

    onAdd = () => {
        this.props.router.push(CREATE_WEDDING_PARTY_MEMBER_ROUTE);
    };

    onSelect = (member: Object) => {
        this.props.router.push(updateWeddingPartyMemberRoute(member.id));
    };

    onDrop = ({ id }: Object) => {
        const member = this.props.weddingPartyMembers.find(o => o.id === id);
        this.props.actions.updateWeddingPartyMember(member);
    };

    onDelete(member: Object) {
        if (!confirm('Are you sure you want to delete this member?')) {
            return;
        }

        this.props.actions.deleteWeddingPartyMember(member);
    }

    render() {
        const { weddingPartyMembers, loading } = this.props;

        return (
            <WeddingPartyMembersList
                weddingPartyMembers={weddingPartyMembers}
                loading={loading}
                onAdd={this.onAdd}
            />
        );
    }
}
