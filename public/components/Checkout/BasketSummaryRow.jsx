import React from 'react';
import { Button } from 'react-bootstrap';
import FontAwesome from '../common/FontAwesome';
import css from './BasketSummaryRow.styl';

export default class BasketSummaryRow extends React.Component {
    static propTypes = {
        item: React.PropTypes.shape({
            name: React.PropTypes.string.isRequired,
            price: React.PropTypes.number.isRequired,
            quantity: React.PropTypes.number.isRequired,
            remaining: React.PropTypes.number.isRequired,
        }).isRequired,
        onAdd: React.PropTypes.func.isRequired,
        onRemove: React.PropTypes.func.isRequired,
        onDelete: React.PropTypes.func.isRequired,
    };

    onAdd = () => {
        this.props.onAdd(this.props.item);
    };

    onRemove = () => {
        this.props.onRemove(this.props.item);
    };

    onDelete = () => {
        this.props.onDelete(this.props.item);
    };

    render() {
        return (
            <tr>
                <th>{this.props.item.name}</th>
                <th>{this.props.item.price}</th>
                <th>
                    <Button
                        bsSize="xsmall"
                        bsStyle="success"
                        onClick={this.onRemove}
                        disabled={this.props.item.quantity === 1}
                    >
                        <FontAwesome icon="minus" />
                    </Button>

                    <span className={css.quantity}>
                        {this.props.item.quantity}
                    </span>

                    <Button
                        bsSize="xsmall"
                        bsStyle="success"
                        onClick={this.onAdd}
                        disabled={this.props.item.quantity === this.props.item.remaining}
                    >
                        <FontAwesome icon="plus" />
                    </Button>
                </th>
                <th>{this.props.item.remaining}</th>
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
