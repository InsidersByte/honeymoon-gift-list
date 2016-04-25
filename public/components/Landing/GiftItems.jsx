import React from 'react';
import GiftItem from './GiftItem';

export default function GiftItems(props) {
    return (
        <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: '15px', justifyContent: 'center' }}>
            {
                props
                    .giftItems
                    .map(item => (
                        <GiftItem
                            key={item._id} // eslint-disable-line no-underscore-dangle
                            item={item}
                            addToBasket={props.addToBasket}
                            basketItems={props.basketItems}
                        />
                    ))
            }
        </div>
    );
}

GiftItems.propTypes = {
    giftItems: React.PropTypes.array.isRequired,
    addToBasket: React.PropTypes.func.isRequired,
    basketItems: React.PropTypes.object.isRequired,
};
