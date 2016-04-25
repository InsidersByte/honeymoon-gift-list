import React from 'react';
import { ButtonToolbar, Button } from 'react-bootstrap';
import FontAwesome from '../common/FontAwesome';

export default class UserRow extends React.Component {
    static propTypes = {
        user: React.PropTypes.object.isRequired,
        onEdit: React.PropTypes.func.isRequired,
        onDelete: React.PropTypes.func.isRequired,
    };

    onDelete = () => {
        this.props.onDelete(this.props.user);
    };

    onEdit = () => {
        this.props.onEdit(this.props.user);
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
                            bsStyle="primary"
                            onClick={this.onEdit}
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
