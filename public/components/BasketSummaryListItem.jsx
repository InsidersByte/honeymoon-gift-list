/* @flow */

import React from 'react';
import { IconButton, RaisedButton } from 'material-ui';
import Add from 'material-ui/svg-icons/content/add';
import Remove from 'material-ui/svg-icons/content/remove';
import Delete from 'material-ui/svg-icons/content/clear';
import css from './BasketSummaryListItem.styl';

type PropsType = {
    item: {
        name: string,
        imageUrl: string,
        price: number,
        quantity: number,
        total: number,
        remaining: number,
    },
    addToBasket: Function,
    removeFromBasket: Function,
    deleteFromBasket: Function,
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

export default class BasketSummaryListItem extends React.Component {
    props: PropsType;

    onAdd = () => {
        this.props.addToBasket(this.props.item);
    };

    onRemove = () => {
        this.props.removeFromBasket(this.props.item);
    };

    onDelete = () => {
        this.props.deleteFromBasket(this.props.item);
    };

    render() {
        const { item: { name, imageUrl, price, quantity, remaining } } = this.props;

        console.log(this.props.item);

        return (
            <div className={css.root}>
                <img className={css.avatar} src={imageUrl} alt={name} />

                <div className={css.textContainer}>
                    <h3 className={css.name}>{name}</h3>

                    <div>
                        <RaisedButton
                            primary
                            icon={<Remove style={styles.icon} />}
                            onClick={this.onRemove}
                            disabled={quantity === 1}
                            style={styles.button}
                        />

                        <span className={css.quantity}>
                            {quantity}
                        </span>

                        <RaisedButton
                            primary
                            icon={<Add style={styles.icon} />}
                            onClick={this.onAdd}
                            disabled={quantity === remaining}
                            style={styles.button}
                        />
                    </div>

                    <h4 className={css.total}>£{price * quantity}</h4>
                </div>

                <IconButton touch onClick={this.onDelete}>
                    <Delete />
                </IconButton>
            </div>
        );
    }
}
