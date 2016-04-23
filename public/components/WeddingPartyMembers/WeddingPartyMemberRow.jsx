import React from 'react';
import { ButtonToolbar, Button } from 'react-bootstrap';
import FontAwesome from '../common/FontAwesome';

export default class WeddingPartyMemberRow extends React.Component {
    static propTypes = {
        member: React.PropTypes.object.isRequired,
        onDelete: React.PropTypes.func.isRequired,
        onSelect: React.PropTypes.func.isRequired,
    };

    onDelete = () => {
        this.props.onDelete(this.props.member);
    };

    onSelect = () => {
        this.props.onSelect(this.props.member);
    };

    render() {
        return (
            <tr>
                <th>{this.props.member.name}</th>
                <th>{this.props.member.imageUrl}</th>
                <th>{this.props.member.description}</th>
                <th>
                    <ButtonToolbar>
                        <Button
                            bsSize="xsmall"
                            bsStyle="primary"
                            onClick={this.onSelect}
                        >
                            <FontAwesome icon="pencil" />
                        </Button>

                        <Button
                            bsSize="xsmall"
                            bsStyle="danger"
                            onClick={this.onDelete}
                        >
                            <FontAwesome icon="trash" />
                        </Button>
                    </ButtonToolbar>
                </th>
            </tr>
        );
    }
}
