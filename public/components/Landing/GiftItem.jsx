import React from 'react';
import { Button } from 'react-bootstrap';
import FontAwesome from '../common/FontAwesome';

import './GiftItem.styl';

class GiftItem extends React.Component {
    onClick = (event) => {
        this.props.addToBasket(this.props.item, event);
    };

    render() {
        const item = this.props.item;
        const id = item._id; // eslint-disable-line no-underscore-dangle

        const basketItem = this.props.basketItems[id] || { quantity: 0 };
        const outOfStock = item.remaining - basketItem.quantity <= 0;

        let button;

        if (outOfStock) {
            button = <Button disabled>Fully Gifted!</Button>;
        } else {
            button = (
                <Button bsStyle="success" onClick={this.onClick}>
                    <FontAwesome icon="shopping-basket" /> Add to Basket £ {item.price}
                </Button>
            );
        }

        const backgroundImageStyle = { backgroundImage: `url(${item.imageUrl})` };

        return (
            <div className="gift-item">
                <div className="gift-item__avatar" style={backgroundImageStyle}>
                </div>

                <div style={{ padding: '8px' }}>
                    <h4>{item.name}</h4>
                    <p>Remaining: {item.remaining}</p>

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
