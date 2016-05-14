import React from 'react';
import { Jumbotron, Button, Glyphicon } from 'react-bootstrap';
import HoneymoonGiftListItemActions from '../../actions/HoneymoonGiftListItemActions';
import HoneymoonGiftListItemStore from '../../stores/HoneymoonGiftListItemStore';
import HoneymoonGiftListItem from './HoneymoonGiftListItem';
import Loader from '../common/Loader';
import SortableContainer from '../common/SortableContainer';
import SortableItem from '../common/SortableItem';
import HoneymoonGiftListItemListItem from './HoneymoonGiftListItemListItem';

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

    onChange = ({ target: { name, value } }) => {
        const item = Object.assign(this.state.item, { [name]: value });
        this.setState({ item });
    };

    onDrop = ({ id }) => {
        const item = this.state.items.find(o => o._id === id); // eslint-disable-line no-underscore-dangle
        HoneymoonGiftListItemActions.update({ item, id });
    };

    onSubmit = (item) => {
        if (!item._id) { // eslint-disable-line no-underscore-dangle
            HoneymoonGiftListItemActions.create({ item });
        } else {
            HoneymoonGiftListItemActions.update({ item, id: item._id }); // eslint-disable-line no-underscore-dangle
        }
    };

    onDelete = (item) => {
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
        const itemList = this.state.items.map(item =>
            <SortableItem
                key={item._id} // eslint-disable-line no-underscore-dangle
                id={item._id} // eslint-disable-line no-underscore-dangle
                onMove={HoneymoonGiftListItemActions.move}
                onDrop={this.onDrop}
            >
                <HoneymoonGiftListItemListItem
                    item={item}
                    onSelect={this.open}
                    onDelete={this.onDelete}
                />
            </SortableItem>
        );

        return (
            <div>
                <SortableContainer>
                    <Jumbotron>
                        <h1>
                            Honeymoon Gift List Items&nbsp;
                            <Button bsStyle="success" bsSize="small" onClick={this.add}>
                                <Glyphicon glyph="plus" />
                            </Button>
                        </h1>

                        <Loader loading={this.state.loading}>
                            {itemList}
                        </Loader>
                    </Jumbotron>
                </SortableContainer>

                <HoneymoonGiftListItem
                    item={this.state.item}
                    show={this.state.showModal}
                    onHide={this.close}
                    onChange={this.onChange}
                    onSubmit={this.onSubmit}
                    saving={this.state.saving}
                />
            </div>
        );
    }
}
