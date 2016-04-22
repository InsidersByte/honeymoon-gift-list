import React from 'react';
import { Jumbotron } from 'react-bootstrap';
import WeddingPartyMemberForm from './WeddingPartyMemberForm';
import WeddingPartyMemberActions from '../../actions/WeddingPartyMemberActions';

export default class WeddingPartyMemberPage extends React.Component {
    state = {
        member: {
            name: '',
            imageUrl: '',
            description: '',
        },
    };

    onChange = ({ target: { name, value } }) => {
        this.setState(Object.assign(this.state.member, { [name]: value }));
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

