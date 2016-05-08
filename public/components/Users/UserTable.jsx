import React from 'react';
import { Table } from 'react-bootstrap';
import UserRow from './UserRow';

export default function UserTable(props) {
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
                    .map(user =>
                        <UserRow
                            key={user._id} // eslint-disable-line no-underscore-dangle
                            user={user}
                            onDelete={props.onDelete}
                        />
                    )
                }
            </tbody>
        </Table>
    );
}

UserTable.propTypes = {
    users: React.PropTypes.array.isRequired,
    onDelete: React.PropTypes.func.isRequired,
};
