/* @flow */

import React, { Component } from 'react';
import { RaisedButton } from 'material-ui';
import AddShoppingCart from 'material-ui/svg-icons/action/add-shopping-cart';
import css from './LandingGift.styl';

type PropsType = {
    gift: {
        id: number,
        name: string,
        imageUrl: string,
        price: number,
        remaining: number,
    },
    basket: Map<number, Object>,
    addToBasket: Function,
};

export default class LandingGift extends Component {
    props: PropsType;

    onClick = () => {
        this.props.addToBasket(this.props.gift);
    };

    renderAddToBasketButton = () => {
        const { gift: { id, remaining, price }, basket } = this.props;

        const { quantity } = basket.get(id) || { quantity: 0 };
        const outOfStock = remaining - quantity <= 0;

        if (outOfStock) {
            return (
                <RaisedButton
                    label="Fully Gifted!"
                    disabled
                />
            );
        }

        return (
            <RaisedButton
                primary
                label={`Add to Basket £${price}`}
                onClick={this.onClick}
                icon={<AddShoppingCart />}
            />
        );
    };

    render() {
        const { gift: { name, imageUrl, remaining } } = this.props;

        const backgroundImageStyle = { backgroundImage: `url(${imageUrl})` };

        return (
            <div className={css.root}>
                <div className={css.avatar} style={backgroundImageStyle} />

                <div className={css.content}>
                    <h4>{name}</h4>
                    <p>Remaining: {remaining}</p>

                    {this.renderAddToBasketButton()}
                </div>
            </div>
        );
    }
}
