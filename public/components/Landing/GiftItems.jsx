import React from 'react';
import GiftItem from './GiftItem';

import css from './GiftItems.styl';

export default function GiftItems({ giftItems, addToBasket, basketItems }) {
    return (
        <div className={css.root}>
            {
                giftItems
                    .map(item =>
                        <GiftItem
                            key={item.id}
                            item={item}
                            addToBasket={addToBasket}
                            basketItems={basketItems}
                        />
                    )
            }
        </div>
    );
}

GiftItems.propTypes = {
    giftItems: React.PropTypes.arrayOf(React.PropTypes.shape({})).isRequired,
    addToBasket: React.PropTypes.func.isRequired,
    basketItems: React.PropTypes.shape({}).isRequired,
};
