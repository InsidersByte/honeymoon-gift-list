/* @flow */

import React, { Component } from 'react';
import { Avatar, ListItem, IconButton } from 'material-ui';
import Person from 'material-ui/svg-icons/social/person';
import Delete from 'material-ui/svg-icons/action/delete';

type PropsType = {
    user: {
        id: string,
        name: string,
        email: string,
    },
    loggedInUser: {
        email: string,
    },
    onDelete: Function,
};

export default class ActiveUserListItem extends Component {
    props: PropsType;

    onDelete = () => {
        this.props.onDelete(this.props.user);
    };

    render() {
        const { user: { id, name, email }, loggedInUser } = this.props;
        const deletable = email !== loggedInUser.email;

        if (deletable) {
            return (
                <ListItem
                    key={id}
                    leftAvatar={<Avatar icon={<Person />} />}
                    rightIconButton={<IconButton onClick={this.onDelete}><Delete /></IconButton>}
                    primaryText={name}
                    secondaryText={email}
                />
            );
        }

        return (
            <ListItem
                key={id}
                leftAvatar={<Avatar icon={<Person />} />}
                primaryText={name}
                secondaryText={email}
            />
        );
    }
}
