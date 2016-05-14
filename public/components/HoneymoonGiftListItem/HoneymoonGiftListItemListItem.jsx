import React from 'react';
import { Button } from 'react-bootstrap';
import FontAwesome from '../common/FontAwesome';
import css from './HoneymoonGiftListItemListItem.styl';

export default class HoneymoonGiftListItemListItem extends React.Component {
    static propTypes = {
        item: React.PropTypes.shape({
            imageUrl: React.PropTypes.string.isRequired,
            name: React.PropTypes.string.isRequired,
            description: React.PropTypes.string.isRequired,
            requested: React.PropTypes.number.isRequired,
            remaining: React.PropTypes.number.isRequired,
            price: React.PropTypes.number.isRequired,
        }).isRequired,
        onSelect: React.PropTypes.func.isRequired,
        onDelete: React.PropTypes.func.isRequired,
    };

    onSelect = () => {
        this.props.onSelect(this.props.item);
    };

    onDelete = () => {
        this.props.onDelete(this.props.item);
    };

    render() {
        return (
            <div className={css.root}>
                <img className={css.avatar} src={this.props.item.imageUrl} alt={this.props.item.name} />

                <div className={css.textContainer}>
                    <h3 className={css.name}>{this.props.item.name}</h3>
                    <h4 className={css.title}>Price: £{this.props.item.price}</h4>
                    <h4 className={css.title}>Requested: {this.props.item.requested}</h4>
                    <h4 className={css.title}>Remaining: {this.props.item.remaining}</h4>
                    <p className={css.description}>{this.props.item.description}</p>
                </div>

                <div className={css.actionContainer}>
                    <Button bsSize="small" bsStyle="primary" onClick={this.onSelect}>
                        <FontAwesome icon="pencil" />
                    </Button>

                    <Button bsSize="small" bsStyle="danger" onClick={this.onDelete}>
                        <FontAwesome icon="trash" />
                    </Button>
                </div>
            </div>
        );
    }
}
