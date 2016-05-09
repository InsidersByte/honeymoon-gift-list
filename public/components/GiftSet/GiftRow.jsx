import React from 'react';

export default function GiftRow(props) {
    return (
        <tr>
            <th>{props.gift.honeymoonGiftListItem.name}</th>
            <th>{props.gift.price}</th>
            <th>{props.gift.quantity}</th>
            <th>{props.gift.total}</th>
        </tr>
    );
}

GiftRow.propTypes = {
    gift: React.PropTypes.shape({
        honeymoonGiftListItem: React.PropTypes.shape({
            name: React.PropTypes.string.isRequired,
        }).isRequired,
        price: React.PropTypes.number.isRequired,
        quantity: React.PropTypes.number.isRequired,
        total: React.PropTypes.number.isRequired,
    }).isRequired,
};

GiftRow.defaultProps = {
    gift: {},
};
