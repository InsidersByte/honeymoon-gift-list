/* @flow */

import React from 'react';
import { Paper, Toolbar, ToolbarGroup, ToolbarTitle, IconButton } from 'material-ui';
import PersonAdd from 'material-ui/svg-icons/social/person-add';
import Loader from './Loader';
import ActiveUserList from './ActiveUserList';
import InvitedUserList from './InvitedUserList';

type PropsType = {
    loading: boolean,
    activeUsers: Array<{
        id: string,
        name: string,
        email: string,
    }>,
    invitedUsers: Array<{
        id: string,
        email: string,
    }>,
    loggedInUser: {
        email: string,
    },
    onAdd: Function,
    onDelete: Function,
};

export default function UserList({ loading, activeUsers, invitedUsers, loggedInUser, onAdd, onDelete }: PropsType) {
    return (
        <Loader loading={loading}>
            <Paper>
                <Toolbar>
                    <ToolbarGroup>
                        <ToolbarTitle text="Users" />
                    </ToolbarGroup>

                    <ToolbarGroup>
                        <IconButton touch onClick={onAdd}>
                            <PersonAdd />
                        </IconButton>
                    </ToolbarGroup>
                </Toolbar>

                <InvitedUserList
                    users={invitedUsers}
                    onDelete={onDelete}
                />

                <ActiveUserList
                    users={activeUsers}
                    loggedInUser={loggedInUser}
                    onDelete={onDelete}
                />
            </Paper>
        </Loader>
    );
}
