/* @flow */

import React from 'react';
import { Avatar, ListItem, IconButton } from 'material-ui';
import Email from 'material-ui/svg-icons/communication/email';
import Delete from 'material-ui/svg-icons/action/delete';
import type { UserType } from '../../types';

type PropsType = {
  user: UserType,
  onDelete: Function,
};

const InvitedUserListItem = ({ user, onDelete }: PropsType) => {
  const { id, email } = user;
  const handleDelete = () => onDelete(user);

  return (
    <ListItem
      key={id}
      leftAvatar={<Avatar icon={<Email />} />}
      rightIconButton={<IconButton onClick={handleDelete}><Delete /></IconButton>}
      primaryText={email}
    />
  );
};

export default InvitedUserListItem;
