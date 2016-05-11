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
            requested: React.PropTypes.oneOfType([
                React.PropTypes.string.isRequired,
                React.PropTypes.number.isRequired,
            ]).isRequired,
            price: React.PropTypes.oneOfType([
                React.PropTypes.string.isRequired,
                React.PropTypes.number.isRequired,
            ]).isRequired,
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
        const { item: { imageUrl, name, description /* , requested, price */ } } = this.props;

        return (
            <div className={css.root}>
                <img className={css.avatar} src={imageUrl} alt={name} />

                <div className={css.textContainer}>
                    <h3 className={css.name}>{name}</h3>
                    <h4 className={css.title}>{name}</h4>
                    <p className={css.description}>{description}</p>
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
