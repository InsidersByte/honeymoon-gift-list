/* @flow */

import React from 'react';
import { List, Subheader, Divider } from 'material-ui';
import InvitedUserListItem from '../InvitedUserListItem';

type PropsType = {
  users: Array<{
    id: number,
    email: string,
  }>,
  onDelete: Function,
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
