/* @flow */

import React from 'react';
import { Paper, Toolbar, ToolbarGroup, ToolbarTitle, IconButton } from 'material-ui';
import PersonAdd from 'material-ui/svg-icons/social/person-add';
import Loader from './Loader';
import ActiveUserList from './ActiveUserList';
import InvitedUserList from './InvitedUserList';
import type { UsersType, AuthUser } from '../types';

type PropsType = {
  loading: boolean,
  activeUsers: UsersType,
  invitedUsers: UsersType,
  loggedInUser: AuthUser,
  onAdd: Function,
  onDelete: Function,
};

export default function UserList({ loading, activeUsers, invitedUsers, loggedInUser, onAdd, onDelete }: PropsType) {
  return (
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

      <Loader loading={loading}>
        <InvitedUserList users={invitedUsers} onDelete={onDelete} />

        <ActiveUserList users={activeUsers} loggedInUser={loggedInUser} onDelete={onDelete} />
      </Loader>
    </Paper>
  );
}
