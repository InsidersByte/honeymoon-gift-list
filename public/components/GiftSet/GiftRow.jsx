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
    gift: React.PropTypes.object.isRequired,
};

GiftRow.defaultProps = {
    gift: {},
};
