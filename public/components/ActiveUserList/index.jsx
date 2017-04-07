/* @flow */

import React from 'react';
import { List, Subheader, Divider } from 'material-ui';
import ActiveUserListItem from '../ActiveUserListItem';
import type { UsersType, UserType, AuthUser } from '../../types';

type PropsType = {
  users: UsersType,
  loggedInUser: AuthUser,
  onDelete: (user: UserType) => void,
};

const ActiveUserList = ({ users, loggedInUser, onDelete }: PropsType) => (
  <List>
    <Subheader>
      Active users
    </Subheader>

    <Divider />

    {users.map(user => <ActiveUserListItem key={user.id} user={user} loggedInUser={loggedInUser} onDelete={onDelete} />)}
  </List>
);

export default ActiveUserList;
