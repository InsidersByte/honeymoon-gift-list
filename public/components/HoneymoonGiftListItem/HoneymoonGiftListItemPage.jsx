import React from 'react';
import { Jumbotron, Button, Glyphicon } from 'react-bootstrap';
import HoneymoonGiftListItemActions from '../../actions/HoneymoonGiftListItemActions';
import HoneymoonGiftListItemStore from '../../stores/HoneymoonGiftListItemStore';
import HoneymoonGiftListItem from './HoneymoonGiftListItem';
import HoneymoonGiftListItemTable from './HoneymoonGiftListItemTable';
import Loader from '../common/Loader';

export default class HoneymoonGiftListItemPage extends React.Component {
    state = { ...HoneymoonGiftListItemStore.getState(), showModal: false };

    componentDidMount() {
        HoneymoonGiftListItemStore.listen(this.onStoreChange);
        HoneymoonGiftListItemActions.query.defer();
    }

    componentWillUnmount() {
        HoneymoonGiftListItemStore.unlisten(this.onStoreChange);
    }

    onStoreChange = state => {
        if (this.state.removing && !state.removing) {
            HoneymoonGiftListItemActions.query.defer();
        }

        if (this.state.saving && !state.saving) {
            HoneymoonGiftListItemActions.query.defer();
            this.close();
        }

        this.setState(state);
    };

    setItemState = (event) => {
        const field = event.target.name;
        const value = event.target.value;
        this.state.item[field] = value;
        return this.setState({ item: this.state.item });
    };

    save = (item) => {
        if (!item._id) { // eslint-disable-line no-underscore-dangle
            HoneymoonGiftListItemActions.create({ item });
        } else {
            HoneymoonGiftListItemActions.update({ item, id: item._id }); // eslint-disable-line no-underscore-dangle
        }
    };

    delete = (item) => {
        // TODO: Use a confirmation model instead of confirm
        if (!confirm('Are you sure you want to delete this gift item?')) {
            return;
        }

        HoneymoonGiftListItemActions.remove(item);
    };

    add = () => {
        HoneymoonGiftListItemActions.reset();
        this.setState({ showModal: true });
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

                    <Loader loading={this.state.loading}>
                        <HoneymoonGiftListItemTable items={this.state.items} onEdit={this.open} onDelete={this.delete} />
                    </Loader>
                </Jumbotron>

                <HoneymoonGiftListItem
                    item={this.state.item}
                    show={this.state.showModal}
                    onHide={this.close}
                    onChange={this.setItemState}
                    onSubmit={this.save}
                    loading={this.state.loading}
                    saving={this.state.saving}
                />
            </div>
        );
    }
}
