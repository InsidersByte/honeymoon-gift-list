import React from 'react';
import { Table } from 'react-bootstrap';
import UserRow from './UserRow';

export default function UserTable({ users, loggedInUser, onDelete }) {
    return (
        <Table striped bordered condensed hover responsive>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Username</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
            </thead>

            <tbody>
                {users
                    .map(user =>
                        <UserRow
                            key={user._id} // eslint-disable-line no-underscore-dangle
                            user={user}
                            loggedInUser={loggedInUser}
                            onDelete={onDelete}
                        />
                    )
                }
            </tbody>
        </Table>
    );
}

UserTable.propTypes = {
    users: React.PropTypes.arrayOf(React.PropTypes.shape({})).isRequired,
    loggedInUser: React.PropTypes.shape({}).isRequired,
    onDelete: React.PropTypes.func.isRequired,
};
