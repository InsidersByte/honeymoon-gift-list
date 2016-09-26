/* @flow */

import React from 'react';
import { List, Subheader, Divider } from 'material-ui';
import InvitedUserListItem from './InvitedUserListItem';

type PropsType = {
    users: Array<{
        _id: string,
        username: string,
    }>,
    onDelete: Function,
};

export default function InvitedUserList({ users, onDelete }: PropsType) {
    if (users.length === 0) {
        return null;
    }

    return (
        <List>
            <Subheader>
                Invited users
            </Subheader>

            <Divider />

            {
                users.map((user, i) =>
                    <InvitedUserListItem
                        key={i}
                        user={user}
                        onDelete={onDelete}
                    />
                )
            }
        </List>
    );
}
