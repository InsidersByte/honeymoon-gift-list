import React from 'react';
import { RaisedButton } from 'material-ui';
import { TableRow, TableRowColumn } from 'material-ui/Table';
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
    icon: {
        width: 18,
        height: 18,
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
            <TableRow>
                <TableRowColumn>{name}</TableRowColumn>
                <TableRowColumn>{price}</TableRowColumn>
                <TableRowColumn>
                    <RaisedButton
                        primary
                        icon={<Remove style={styles.icon} />}
                        onClick={this.onRemove}
                        disabled={quantity === 1}
                        style={styles.button}
                    />

                    <span className={css.quantity}>
                        {quantity}
                    </span>

                    <RaisedButton
                        primary
                        icon={<Add style={styles.icon} />}
                        onClick={this.onAdd}
                        disabled={quantity === remaining}
                        style={styles.button}
                    />
                </TableRowColumn>
                <TableRowColumn>{remaining}</TableRowColumn>
                <TableRowColumn>
                    <RaisedButton
                        secondary
                        icon={<Delete style={styles.icon} />}
                        onClick={this.onDelete}
                        style={styles.button}
                    />
                </TableRowColumn>
            </TableRow>
        );
    }
}
