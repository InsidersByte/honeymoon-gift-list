/* @flow */

import React from 'react';
import { List, Subheader, Divider } from 'material-ui';
import ActiveUserListItem from './ActiveUserListItem';

type PropsType = {
    users: Array<{
        id: number,
        name: string,
        email: string,
    }>,
    loggedInUser: {
        email: string,
    },
    onDelete: Function,
};

export default function ActiveUserList({ users, loggedInUser, onDelete }: PropsType) {
    return (
        <List>
            <Subheader>
                Active users
            </Subheader>

            <Divider />

            {users.map(user =>
                <ActiveUserListItem
                    key={user.id}
                    user={user}
                    loggedInUser={loggedInUser}
                    onDelete={onDelete}
                />,
            )}
        </List>
    );
}
