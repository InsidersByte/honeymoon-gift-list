/* @flow */

import React from 'react';
import { List, Subheader, Divider } from 'material-ui';
import InvitedUserListItem from '../InvitedUserListItem';
import type { UsersType, UserType } from '../../types';

type PropsType = {
  users: UsersType,
  onDelete: (user: UserType) => void,
};

const InvitedUserList = ({ users, onDelete }: PropsType) => {
  if (users.length === 0) {
    return null;
  }

  return (
    <List>
      <Subheader>
        Invited users
      </Subheader>

      <Divider />

      {users.map(user => <InvitedUserListItem key={user.id} user={user} onDelete={onDelete} />)}
    </List>
  );
};

export default InvitedUserList;
