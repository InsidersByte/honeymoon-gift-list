/* @flow */

import React from 'react';
import { IconButton } from 'material-ui';
import Edit from 'material-ui/svg-icons/image/edit';
import Delete from 'material-ui/svg-icons/action/delete';
import css from './GiftListItem.styl';

type PropsType = {
    gift: {
        id: number,
        name: string,
        imageUrl: string,
        requested: number,
        remaining: number,
        price: number,
    },
    onSelect: Function,
    onDelete: Function,
};

export default class GiftListItem extends React.Component {
    props: PropsType;

    onSelect = () => {
        this.props.onSelect(this.props.gift);
    };

    onDelete = () => {
        this.props.onDelete(this.props.gift);
    };

    render() {
        const { gift: { name, imageUrl, requested, remaining, price } } = this.props;

        return (
            <div className={css.root}>
                <img className={css.avatar} src={imageUrl} alt={name} />

                <div className={css.textContainer}>
                    <h3 className={css.name}>{name}</h3>
                    <h4 className={css.title}>Price: £{price}</h4>
                    <h4 className={css.title}>Requested: {requested}</h4>
                    <h4 className={css.title}>Remaining: {remaining}</h4>
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
