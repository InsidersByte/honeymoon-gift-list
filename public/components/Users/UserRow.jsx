import React from 'react';
import { Button } from 'react-bootstrap';
import FontAwesome from '../common/FontAwesome';

export default class UserRow extends React.Component {
    static propTypes = {
        user: React.PropTypes.shape({
            name: React.PropTypes.string.isRequired,
            username: React.PropTypes.string.isRequired,
        }).isRequired,
        loggedInUser: React.PropTypes.shape({
            username: React.PropTypes.string.isRequired,
        }).isRequired,
        onDelete: React.PropTypes.func.isRequired,
    };

    onDelete = () => {
        this.props.onDelete(this.props.user);
    };

    render() {
        const deletable = this.props.user.username !== this.props.loggedInUser.username;

        return (
            <tr>
                <th>{this.props.user.name}</th>
                <th>{this.props.user.username}</th>
                <th>
                    { deletable &&
                        <Button
                            bsSize="xsmall"
                            bsStyle="danger"
                            onClick={this.onDelete}
                        >
                            <FontAwesome icon="trash" />
                        </Button>
                    }
                </th>
            </tr>
        );
    }
}
