import React from 'react';
import { Jumbotron, Button, Glyphicon } from 'react-bootstrap';
import HoneymoonGiftListItem from './HoneymoonGiftListItem';
import honeymoonGiftListItemApi from '../../api/honeymoonGiftListItem.api';
import HoneymoonGiftListItemTable from './HoneymoonGiftListItemTable';

class HoneymoonGiftListItemPage extends React.Component {
    constructor() {
        super();

        this.state = {
            items: [],
            showModal: false,
            item: {},
        };
    }

    componentDidMount() {
        this.loadItems();
    }

    setItemState = (event) => {
        const field = event.target.name;
        const value = event.target.value;
        this.state.item[field] = value;
        return this.setState({ item: this.state.item });
    };

    save = (item) => {
        if (item._id) { // eslint-disable-line no-underscore-dangle
            honeymoonGiftListItemApi
                .put(item, item._id) // eslint-disable-line no-underscore-dangle
                .then(() => {
                    this.close();
                    this.loadItems();
                    this.props.toastSuccess('Honeymoon gift list item saved');
                })
                .catch((error) => {
                    this.props.toastError('There was an error saving honeymoon gift list item', error);
                });
        } else {
            honeymoonGiftListItemApi
                .post(item)
                .then(() => {
                    this.close();
                    this.loadItems();
                    this.props.toastSuccess('Honeymoon gift list item saved');
                })
                .catch((error) => {
                    this.props.toastError('There was an error saving honeymoon gift list item', error);
                });
        }
    };

    delete = (item) => {
        // TODO: Use a confirmation model instead of confirm
        if (!confirm('Are you sure you want to delete this gift item?')) {
            return;
        }

        honeymoonGiftListItemApi
            .delete(item._id) // eslint-disable-line no-underscore-dangle
            .then(() => {
                this.close();
                this.loadItems();
                this.props.toastSuccess('honeymoon gift list item deleted');
            })
            .catch((error) => {
                this.props.toastError('There was an error deleting honeymoon gift list item', error);
            });
    };

    loadItems() {
        honeymoonGiftListItemApi
            .get()
            .then((response) => {
                this.setState({
                    items: response,
                });
            })
            .catch((error) => {
                this.props.toastError('There was an error getting honeymoon gift list items', error);
            });
    }

    add = () => {
        this.open({
            imageUrl: '',
            name: '',
            description: '',
            requested: '',
            price: '',
        });
    };

    close = () => {
        this.setState({ showModal: false });
    };

    open = (itemToEdit) => {
        const item = Object.assign({}, itemToEdit);
        this.setState({ showModal: true, item });
    };

    render() {
        return (
            <div>
                <Jumbotron>
                    <h1>
                        Honeymoon Gift List Items&nbsp;
                        <Button bsStyle="success" bsSize="small" onClick={this.add}>
                            <Glyphicon glyph="plus" />
                        </Button>
                    </h1>

                    <HoneymoonGiftListItemTable items={this.state.items} onEdit={this.open} onDelete={this.delete} />
                </Jumbotron>

                <HoneymoonGiftListItem
                    item={this.state.item}
                    show={this.state.showModal}
                    onHide={this.close}
                    onSubmit={this.save}
                    onChange={this.setItemState}
                />
            </div>
        );
    }
}

HoneymoonGiftListItemPage.propTypes = {
    toastSuccess: React.PropTypes.func,
    toastError: React.PropTypes.func,
};

export default HoneymoonGiftListItemPage;
