/* @flow */

import React, { Component } from 'react';
import { IconButton } from 'material-ui';
import Edit from 'material-ui/svg-icons/image/edit';
import Delete from 'material-ui/svg-icons/action/delete';
import css from './WeddingPartyMemberItem.styl';

type PropsType = {
    weddingPartyMember: {
        id: number,
        name: string,
        title: string,
        imageUrl: string,
        description: string,
    },
    onSelect: Function,
    onDelete: Function,
};

export default class WeddingPartyMemberItem extends Component {
    props: PropsType;

    onSelect = () => {
        this.props.onSelect(this.props.weddingPartyMember);
    };

    onDelete = () => {
        this.props.onDelete(this.props.weddingPartyMember);
    };

    render() {
        const { weddingPartyMember: { name, title, description, imageUrl } } = this.props;

        return (
            <div className={css.root}>
                <img className={css.avatar} src={imageUrl} alt={name} />

                <div className={css.textContainer}>
                    <h3 className={css.name}>{name}</h3>
                    <h4 className={css.title}>{title}</h4>
                    <p className={css.description}>{description}</p>
                </div>

                <IconButton touch onClick={this.onSelect}>
                    <Edit />
                </IconButton>

                <IconButton touch onClick={this.onDelete}>
                    <Delete />
                </IconButton>
            </div>
     );
    }
}
