import React from 'react';
import { RaisedButton } from 'material-ui';
import Add from 'material-ui/svg-icons/content/add';
import Remove from 'material-ui/svg-icons/content/remove';
import Delete from 'material-ui/svg-icons/content/clear';
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

const styles = {
    button: {
        minWidth: 24,
        height: 24,
    },
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
                    <RaisedButton
                        primary
                        icon={<Remove />}
                        onClick={this.onRemove}
                        disabled={quantity === 1}
                        style={styles.button}
                    />

                    <span className={css.quantity}>
                        {quantity}
                    </span>

                    <RaisedButton
                        primary
                        icon={<Add />}
                        onClick={this.onAdd}
                        disabled={quantity === remaining}
                        style={styles.button}
                    />
                </th>
                <th>{remaining}</th>
                <th>
                    <RaisedButton
                        secondary
                        icon={<Delete />}
                        onClick={this.onDelete}
                        style={styles.button}
                    />
                </th>
            </tr>
        );
    }
}
