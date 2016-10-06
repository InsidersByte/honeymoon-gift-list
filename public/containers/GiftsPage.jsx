/* @flow */

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/gift';
import GiftDialog from '../components/GiftDialog';
import GiftList from '../components/GiftList';

type PropsType = {
    gifts: Array<{
        id: number,
        name: string,
        imageUrl: string,
        requested: number,
        remaining: number,
        price: number,
    }>,
    giftModalOpen: boolean,
    loading: boolean,
    saving: boolean,
    deleting: boolean,
    actions: {
        loadGifts: Function,
        createGift: Function,
        updateGift: Function,
        deleteGift: Function,
        moveGift: Function,
        openGiftModal: Function,
        closeGiftModal: Function,
    },
};

const initialGift = {
    name: '',
    imageUrl: '',
    requested: 0,
    price: 0,
};

@connect(
    ({ gifts: state }) => {
        const { gifts } = state;

        const sortedGifts = gifts.sort((a, b) => a.position - b.position);

        return Object.assign({}, state, { gifts: sortedGifts });
    },
    dispatch => ({ actions: bindActionCreators(actions, dispatch) })
)
export default class HoneymoonGiftListItemPage extends React.Component {
    props: PropsType;

    state = { gift: { ...initialGift } };

    componentDidMount() {
        this.props.actions.loadGifts();
    }

    // FIXME: This seems like a bit of a hack
    componentWillReceiveProps({ saving: nextSaving, deleting: nextDeleting }: PropsType) {
        const { saving, deleting, actions: { loadGifts } } = this.props;

        if (deleting && !nextDeleting) {
            loadGifts();
        }

        if (saving && !nextSaving) {
            loadGifts();
        }
    }

    onChange = ({ target: { name, value } }: { target: { name: string, value: string } }) => {
        const gift = Object.assign(this.state.gift, { [name]: value });
        this.setState({ gift });
    };

    onAdd = () => {
        this.props.actions.openGiftModal();
        this.setState({ gift: { ...initialGift } });
    };

    onSubmit = (event: SyntheticEvent) => {
        event.preventDefault();

        const { actions: { createGift, updateGift } } = this.props;
        const { gift } = this.state;

        if (!gift.id) {
            createGift(gift);
        } else {
            updateGift(gift);
        }
    };

    onSelect = (gift: Object) => {
        this.props.actions.openGiftModal();
        this.setState({ gift: { ...gift } });
    };

    onDrop = ({ id }: Object) => {
        const gift = this.props.gifts.find(o => o.id === id);
        this.props.actions.updateGift(gift);
    };

    onDelete = (item: Object) => {
        if (!confirm('Are you sure you want to delete this gift?')) {
            return;
        }

        this.props.actions.deleteGift(item);
    };

    render() {
        const { gifts, giftModalOpen, loading, saving, actions: { moveGift, closeGiftModal } } = this.props;
        const { gift } = this.state;

        return (
            <div>
                <GiftList
                    gifts={gifts}
                    loading={loading}
                    onAdd={this.onAdd}
                    onSelect={this.onSelect}
                    onMove={moveGift}
                    onDrop={this.onDrop}
                    onDelete={this.onDelete}
                />

                <GiftDialog
                    gift={gift}
                    open={giftModalOpen}
                    onHide={closeGiftModal}
                    onChange={this.onChange}
                    onSubmit={this.onSubmit}
                    saving={saving}
                />
            </div>
        );
    }
}
