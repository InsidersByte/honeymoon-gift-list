import React from 'react';
import { Jumbotron, Button } from 'react-bootstrap';
import { CREATE_WEDDING_PARTY_MEMBER_ROUTE, updateWeddingPartyMemberRoute } from '../../constants/routeConstants';
import WeddingPartyMemberActions from '../../actions/WeddingPartyMemberActions';
import WeddingPartyMemberStore from '../../stores/WeddingPartyMemberStore';
import Loader from '../Loader';
import WeddingPartyMember from './WeddingPartyMember';
import FontAwesome from '../FontAwesome';
import SortableContainer from '../SortableContainer';
import SortableItem from '../SortableItem';

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

    onStoreChange = (state) => {
        if (this.state.removing && !state.removing) {
            WeddingPartyMemberActions.query.defer();
        }

        this.setState(state);
    };

    onSelect = (member) => {
        this.context.router.push(updateWeddingPartyMemberRoute(member.id));
    };

    onDelete(member) {
        if (!confirm('Are you sure you want to delete this member?')) {
            return;
        }

        WeddingPartyMemberActions.remove(member);
    }

    onDrop = ({ id }) => {
        const member = this.state.members.find(o => o.id === id);
        WeddingPartyMemberActions.update({ member, id });
    };

    create = () => {
        this.context.router.push(CREATE_WEDDING_PARTY_MEMBER_ROUTE);
    };

    render() {
        const membersList = this.state.members.map(member =>
            <SortableItem
                key={member.id}
                id={member.id}
                onMove={WeddingPartyMemberActions.move}
                onDrop={this.onDrop}
            >
                <WeddingPartyMember
                    member={member}
                    onSelect={this.onSelect}
                    onDelete={this.onDelete}
                />
            </SortableItem>
        );

        return (
            <SortableContainer>
                <Jumbotron>
                    <h1>Wedding Party Members&nbsp;
                        <Button bsStyle="success" bsSize="small" onClick={this.create}><FontAwesome icon="plus" /></Button>
                    </h1>

                    <Loader loading={this.state.loading}>
                        {membersList}
                    </Loader>
                </Jumbotron>
            </SortableContainer>
        );
    }
}
