import React from 'react';
import { Button } from 'react-bootstrap';
import FontAwesome from '../common/FontAwesome';

import css from './GiftItem.styl';

export default class GiftItem extends React.Component {
    static propTypes = {
        item: React.PropTypes.object.isRequired,
        addToBasket: React.PropTypes.func.isRequired,
        basketItems: React.PropTypes.object.isRequired,
    };

    onClick = (event) => {
        this.props.addToBasket(this.props.item, event);
    };

    render() {
        const { _id, remaining, price, imageUrl, name } = this.props.item; // eslint-disable-line no-underscore-dangle

        const { quantity } = this.props.basketItems.get(_id) || { quantity: 0 };
        const outOfStock = remaining - quantity <= 0;

        let button;

        if (outOfStock) {
            button = <Button disabled>Fully Gifted!</Button>;
        } else {
            button = ( // eslint-disable-line no-extra-parens
                <Button bsStyle="success" onClick={this.onClick}>
                    <FontAwesome icon="shopping-basket" /> Add to Basket £ {price}
                </Button>
            );
        }

        const backgroundImageStyle = { backgroundImage: `url(${imageUrl})` };

        return (
            <div className={css.root}>
                <div className={css.avatar} style={backgroundImageStyle}>
                </div>

                <div className={css.content}>
                    <h4>{name}</h4>
                    <p>Remaining: {remaining}</p>

                    {button}
                </div>
            </div>
        );
    }
}
