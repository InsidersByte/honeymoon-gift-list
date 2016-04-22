import React from 'react';
import { Table } from 'react-bootstrap';
import UserRow from './UserRow';

function UserTable(props) {
    return (
        <Table striped bordered condensed hover responsive>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Username</th>
                    <th>Actions</th>
                </tr>
            </thead>

            <tbody>
                {props
                    .users
                    .map(user => (
                        <UserRow
                            key={user._id} // eslint-disable-line no-underscore-dangle
                            user={user}
                            onEdit={props.onEdit}
                            onDelete={props.onDelete}
                        />
                    ))
                }
            </tbody>
        </Table>
    );
}

UserTable.propTypes = {
    users: React.PropTypes.array.isRequired,
    onEdit: React.PropTypes.func.isRequired,
    onDelete: React.PropTypes.func.isRequired,
};

export default UserTable;
