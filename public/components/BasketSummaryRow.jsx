import React from 'react';
import { Button } from 'react-bootstrap';
import FontAwesome from './FontAwesome';
import css from './BasketSummaryRow.styl';

type PropsType = {
    item: {
        name: string,
        price: number,
        quantity: number,
        remaining: number,
    },
    addToBasket: Function,
    removeFromBasket: Function,
    deleteFromBasket: Function,
};

export default class BasketSummaryRow extends React.Component {
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
        const { item: { name, price, quantity, remaining } } = this.props;

        return (
            <tr>
                <th>{name}</th>
                <th>{price}</th>
                <th>
                    <Button
                        bsSize="xsmall"
                        bsStyle="success"
                        onClick={this.onRemove}
                        disabled={quantity === 1}
                    >
                        <FontAwesome icon="minus" />
                    </Button>

                    <span className={css.quantity}>
                        {quantity}
                    </span>

                    <Button
                        bsSize="xsmall"
                        bsStyle="success"
                        onClick={this.onAdd}
                        disabled={quantity === remaining}
                    >
                        <FontAwesome icon="plus" />
                    </Button>
                </th>
                <th>{remaining}</th>
                <th>
                    <Button
                        bsSize="xsmall"
                        bsStyle="danger"
                        onClick={this.onDelete}
                    >
                        <FontAwesome icon="remove" />
                    </Button>
                </th>
            </tr>
        );
    }
}
