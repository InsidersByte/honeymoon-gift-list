/* @flow */

import React from 'react';
import { List, Subheader, Divider } from 'material-ui';
import ActiveUserListItem from './ActiveUserListItem';

type PropsType = {
    users: Array<{
        _id: string,
        name: string,
        username: string,
    }>,
    loggedInUser: {
        username: string,
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

            {
                users.map((user, i) =>
                    <ActiveUserListItem
                        key={i}
                        user={user}
                        loggedInUser={loggedInUser}
                        onDelete={onDelete}
                    />
                )
            }
        </List>
    );
}
