/* @flow */

import React from 'react';
import { IconButton } from 'material-ui';
import Edit from 'material-ui/svg-icons/image/edit';
import Delete from 'material-ui/svg-icons/action/delete';
import css from './index.styl';

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

const GiftListItem = ({ gift, onSelect, onDelete }: PropsType) => {
    const { name, imageUrl, requested, remaining, price } = gift;
    const handleSelect = () => onSelect(gift);
    const handleDelete = () => onDelete(gift);

    return (
        <div className={css.root}>
            <img className={css.avatar} src={imageUrl} alt={name} />

            <div className={css.textContainer}>
                <h3 className={css.name}>{name}</h3>
                <h4 className={css.title}>Price: £{price}</h4>
                <h4 className={css.title}>Requested: {requested}</h4>
                <h4 className={css.title}>Remaining: {remaining}</h4>
            </div>

            <IconButton touch onClick={handleSelect}>
                <Edit />
            </IconButton>

            <IconButton touch onClick={handleDelete}>
                <Delete />
            </IconButton>
        </div>
    );
};

export default GiftListItem;
