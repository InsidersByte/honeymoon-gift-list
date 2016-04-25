import React from 'react';
import { Jumbotron, Button, Glyphicon } from 'react-bootstrap';
import { CREATE_WEDDING_PARTY_MEMBER_ROUTE, updateWeddingPartyMemberRoute } from '../../constants/routeConstants';
import WeddingPartyMemberActions from '../../actions/WeddingPartyMemberActions';
import WeddingPartyMemberStore from '../../stores/WeddingPartyMemberStore';
import WeddingPartyMembersTable from './WeddingPartyMembersTable';

export default class WeddingPartyMembersPage extends React.Component {
    static contextTypes = {
        router: React.PropTypes.object.isRequired,
    };

    state = WeddingPartyMemberStore.getState();

    componentDidMount() {
        WeddingPartyMemberStore.listen(this.onStoreChange);
        WeddingPartyMemberActions.query.defer();
    }

    componentWillUnmount() {
        WeddingPartyMemberStore.unlisten(this.onStoreChange);
    }

    onStoreChange = state => {
        if (this.state.removing && !state.removing) {
            WeddingPartyMemberActions.query.defer();
        }

        this.setState(state);
    };

    onDelete = (member) => {
        if (!confirm('Are you sure you want to delete this member?')) {
            return;
        }

        WeddingPartyMemberActions.remove(member);
    };

    onSelect = (member) => {
        this.context.router.push(updateWeddingPartyMemberRoute(member._id)); // eslint-disable-line no-underscore-dangle
    };

    create = () => {
        this.context.router.push(CREATE_WEDDING_PARTY_MEMBER_ROUTE);
    };

    render() {
        return (
            <Jumbotron>
                <h1>Wedding Party Members&nbsp;
                    <Button bsStyle="success" bsSize="small" onClick={this.create}><Glyphicon glyph="plus" /></Button>
                </h1>

                <WeddingPartyMembersTable members={this.state.members} onSelect={this.onSelect} onDelete={this.onDelete} />
            </Jumbotron>
        );
    }
}

