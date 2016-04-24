import React from 'react';
import { Button } from 'react-bootstrap';
import FontAwesome from '../common/FontAwesome';

import './GiftItem.styl';

class GiftItem extends React.Component {
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
            button = (
                <Button bsStyle="success" onClick={this.onClick}>
                    <FontAwesome icon="shopping-basket" /> Add to Basket £ {price}
                </Button>
            );
        }

        const backgroundImageStyle = { backgroundImage: `url(${imageUrl})` };

        return (
            <div className="gift-item">
                <div className="gift-item__avatar" style={backgroundImageStyle}>
                </div>

                <div style={{ padding: '8px' }}>
                    <h4>{name}</h4>
                    <p>Remaining: {remaining}</p>

                    {button}
                </div>
            </div>
        );
    }
}

GiftItem.propTypes = {
    item: React.PropTypes.object.isRequired,
    addToBasket: React.PropTypes.func.isRequired,
    basketItems: React.PropTypes.object.isRequired,
};

export default GiftItem;
