import React from 'react';
import { Jumbotron } from 'react-bootstrap';
import WeddingPartyMemberForm from './WeddingPartyMemberForm';
import WeddingPartyMemberActions from '../../actions/WeddingPartyMemberActions';
import WeddingPartyMemberStore from '../../stores/WeddingPartyMemberStore';

export default class WeddingPartyMemberPage extends React.Component {
    state = WeddingPartyMemberStore.getState();

    componentDidMount() {
        WeddingPartyMemberStore.listen(this.onStoreChange);
        WeddingPartyMemberActions.reset();
    }

    componentWillUnmount() {
        WeddingPartyMemberStore.unlisten(this.onStoreChange);
    }

    onStoreChange = state => {
        this.setState(state);
    };

    onChange = ({ target: { name, value } }) => {
        const member = Object.assign(this.state.member, { [name]: value });
        this.setState({ member });
    };

    onSubmit = (event) => {
        event.preventDefault();
        WeddingPartyMemberActions.create(this.state);
    };

    render() {
        return (
            <Jumbotron>
                <h1>Create Wedding Party Member</h1>

                <WeddingPartyMemberForm member={this.state.member} onChange={this.onChange} onSubmit={this.onSubmit} />
            </Jumbotron>
        );
    }
}

