import React from 'react';
import { ButtonToolbar, Button } from 'react-bootstrap';
import FontAwesome from '../common/FontAwesome';

export default class UserRow extends React.Component {
    static propTypes = {
        user: React.PropTypes.shape({
            name: React.PropTypes.string.isRequired,
            username: React.PropTypes.string.isRequired,
        }).isRequired,
        onDelete: React.PropTypes.func.isRequired,
    };

    onDelete = () => {
        this.props.onDelete(this.props.user);
    };

    render() {
        return (
            <tr>
                <th>{this.props.user.name}</th>
                <th>{this.props.user.username}</th>
                <th>
                    <ButtonToolbar>
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
