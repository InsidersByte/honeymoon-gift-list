/* @flow */

import React, { Component } from 'react';
import { Avatar, ListItem, IconButton } from 'material-ui';
import Person from 'material-ui/svg-icons/social/person';
import Delete from 'material-ui/svg-icons/action/delete';

type PropsType = {
    user: {
        _id: string,
        name: string,
        username: string,
    },
    loggedInUser: {
        username: string,
    },
    onDelete: Function,
};

export default class ActiveUserListItem extends Component {
    props: PropsType;

    onDelete = () => {
        this.props.onDelete(this.props.user);
    };

    render() {
        const { user: { _id, name, username }, loggedInUser } = this.props;
        const deletable = username !== loggedInUser.username;

        if (deletable) {
            return (
                <ListItem
                    key={_id}
                    leftAvatar={<Avatar icon={<Person />} />}
                    rightIconButton={<IconButton onClick={this.onDelete}><Delete /></IconButton>}
                    primaryText={name}
                    secondaryText={username}
                />
            );
        }

        return (
            <ListItem
                key={_id}
                leftAvatar={<Avatar icon={<Person />} />}
                primaryText={name}
                secondaryText={username}
            />
        );
    }
}
