/* @flow */

import React, { Component } from 'react';
import { Avatar, ListItem, IconButton } from 'material-ui';
import Email from 'material-ui/svg-icons/communication/email';
import Delete from 'material-ui/svg-icons/action/delete';

type PropsType = {
    user: {
        _id: string,
        username: string,
    },
    onDelete: Function,
};

export default class InvitedUserListItem extends Component {
    props: PropsType;

    onDelete = () => {
        this.props.onDelete(this.props.user);
    };

    render() {
        const { user: { _id, username } } = this.props;

        return (
            <ListItem
                key={_id}
                leftAvatar={<Avatar icon={<Email />} />}
                rightIconButton={<IconButton onClick={this.onDelete}><Delete /></IconButton>}
                primaryText={username}
            />
        );
    }
}
