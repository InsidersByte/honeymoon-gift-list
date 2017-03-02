/* @flow */

import React from 'react';
import { Avatar, ListItem, IconButton } from 'material-ui';
import Person from 'material-ui/svg-icons/social/person';
import Delete from 'material-ui/svg-icons/action/delete';

type PropsType = {
    user: {
        id: number,
        name: string,
        email: string,
    },
    loggedInUser: {
        email: string,
    },
    onDelete: Function,
};

const ActiveUserListItem = ({ user, loggedInUser, onDelete }: PropsType) => {
    const { id, name, email } = user;
    const handleDelete = () => onDelete(user);
    const deletable = email !== loggedInUser.email;

    return (
        <ListItem
            key={id}
            leftAvatar={<Avatar icon={<Person />} />}
            rightIconButton={deletable ? <IconButton onClick={handleDelete}><Delete /></IconButton> : undefined}
            primaryText={name}
            secondaryText={email}
        />
    );
};

export default ActiveUserListItem;
