/* @flow */

import React from 'react';
import { IconButton, RaisedButton } from 'material-ui';
import Add from 'material-ui/svg-icons/content/add';
import Remove from 'material-ui/svg-icons/content/remove';
import Delete from 'material-ui/svg-icons/content/clear';
import type { ItemType } from '../../types';
import css from './index.styl';

type PropsType = {
    item: ItemType,
    addToBasket: (item: ItemType) => void,
    removeFromBasket: (item: ItemType) => void,
    deleteFromBasket: (item: ItemType) => void,
};

const styles = {
    button: {
        minWidth: 24,
        height: 24,
    },
    icon: {
        width: 18,
        height: 18,
    },
};

const BasketSummaryListItem = ({ item, addToBasket, removeFromBasket, deleteFromBasket }: PropsType) => {
    const handleAdd = () => addToBasket(item);
    const handleRemove = () => removeFromBasket(item);
    const handleDelete = () => deleteFromBasket(item);

    const { name, imageUrl, price, quantity, remaining } = item;

    return (
        <div className={css.root}>
            <img className={css.avatar} src={imageUrl} alt={name} />

            <div className={css.textContainer}>
                <h3 className={css.name}>{name}</h3>

                <div>
                    <RaisedButton
                        primary
                        icon={<Remove style={styles.icon} />}
                        onClick={handleRemove}
                        disabled={quantity === 1}
                        disableFocusRipple
                        disableKeyboardFocus
                        disableTouchRipple
                        style={styles.button}
                    />

                    <span className={css.quantity}>
                        {quantity}
                    </span>

                    <RaisedButton
                        primary
                        icon={<Add style={styles.icon} />}
                        onClick={handleAdd}
                        disabled={quantity === remaining}
                        disableFocusRipple
                        disableKeyboardFocus
                        disableTouchRipple
                        style={styles.button}
                    />
                </div>

                <h4 className={css.total}>£{price * quantity}</h4>
            </div>

            <IconButton touch onClick={handleDelete}>
                <Delete />
            </IconButton>
        </div>
    );
};

export default BasketSummaryListItem;
