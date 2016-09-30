import React from 'react';
import { Button } from 'react-bootstrap';
import FontAwesome from '../FontAwesome';

import css from './GiftItem.styl';

export default class GiftItem extends React.Component {
    static propTypes = {
        item: React.PropTypes.shape({
            id: React.PropTypes.string.isRequired,
            remaining: React.PropTypes.number.isRequired,
            price: React.PropTypes.number.isRequired,
            imageUrl: React.PropTypes.string.isRequired,
            name: React.PropTypes.string.isRequired,
        }).isRequired,
        addToBasket: React.PropTypes.func.isRequired,
        basketItems: React.PropTypes.shape({
            get: React.PropTypes.func.isRequired,
        }).isRequired,
    };

    onClick = (event) => {
        this.props.addToBasket(this.props.item, event);
    };

    render() {
        const { id, remaining, price, imageUrl, name } = this.props.item;

        const { quantity } = this.props.basketItems.get(id) || { quantity: 0 };
        const outOfStock = remaining - quantity <= 0;

        let button;

        if (outOfStock) {
            button = <Button disabled>Fully Gifted!</Button>;
        } else {
            button = (
                <Button bsStyle="success" onClick={this.onClick}>
                    <FontAwesome icon="shopping-basket" /> Add to Basket £ {price}
                </Button>
            );
        }

        const backgroundImageStyle = { backgroundImage: `url(${imageUrl})` };

        return (
            <div className={css.root}>
                <div className={css.avatar} style={backgroundImageStyle} />

                <div className={css.content}>
                    <h4>{name}</h4>
                    <p>Remaining: {remaining}</p>

                    {button}
                </div>
            </div>
        );
    }
}
