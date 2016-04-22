import React from 'react';
import { Jumbotron, Button, Glyphicon } from 'react-bootstrap';
import { CREATE_WEDDING_PARTY_MEMBER_ROUTE } from '../../constants/routes.constants';

export default class WeddingPartyMembersPage extends React.Component {
    static contextTypes = {
        router: React.PropTypes.object.isRequired,
    };

    state = {
        weddingPartyMembers: [],
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
            </Jumbotron>
        );
    }
}

