/* @flow */

import React, { Component } from 'react';
import { Avatar, ListItem, IconButton } from 'material-ui';
import Email from 'material-ui/svg-icons/communication/email';
import Delete from 'material-ui/svg-icons/action/delete';

type PropsType = {
    user: {
        id: number,
        email: string,
    },
    onDelete: Function,
};

export default class InvitedUserListItem extends Component {
    props: PropsType;

    onDelete = () => {
        this.props.onDelete(this.props.user);
    };

    render() {
        const { user: { id, email } } = this.props;

        return (
            <ListItem
                key={id}
                leftAvatar={<Avatar icon={<Email />} />}
                rightIconButton={<IconButton onClick={this.onDelete}><Delete /></IconButton>}
                primaryText={email}
            />
        );
    }
}
