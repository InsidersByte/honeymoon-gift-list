/* @flow */

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/weddingProfile';
import WeddingProfileForm from '../components/WeddingProfileForm';

type PropsType = {
    loading: boolean,
    saving: boolean,
    weddingProfile: {
        id: number,
        coverTitle: string,
        coverImageUrl: string,
        weddingDate: Date,
        giftListContent: string,
        showPaymentMessage: boolean,
        paymentMessage: string,
        showDisclaimerMessage: boolean,
        disclaimerMessage: string,
    },
    actions: {
        loadWeddingProfile: Function,
        updateWeddingProfile: Function,
    },
};

@connect(
    ({ weddingProfile: { weddingProfile, ...state } }) => {
        if (!weddingProfile || !weddingProfile.weddingDate) {
            return {
                ...state,
                weddingProfile,
            };
        }

        const weddingDate = new Date(weddingProfile.weddingDate);
        const updatedWeddingProfile = Object.assign({}, weddingProfile, { weddingDate });

        return {
            ...state,
            weddingProfile: updatedWeddingProfile,
        };
    },
    dispatch => ({ actions: bindActionCreators(actions, dispatch) })
)
export default class WeddingProfilePage extends React.Component {
    props: PropsType;

    state = {
        weddingProfile: this.props.weddingProfile,
        open: false,
    };

    componentDidMount() {
        this.props.actions.loadWeddingProfile();
    }

    componentWillReceiveProps({ weddingProfile }: PropsType) {
        if (weddingProfile.id !== this.state.weddingProfile.id) {
            this.setState({ weddingProfile: { ...weddingProfile } });
        }
    }

    onChange = ({ target: { name, value } }: { target: { name: string, value: string } }) => {
        const weddingProfile = Object.assign({}, this.state.weddingProfile, { [name]: value });
        this.setState({ weddingProfile });
    };

    onDateChange = (event: SyntheticEvent, date: Date) => {
        const weddingProfile = Object.assign({}, this.state.weddingProfile, { weddingDate: date });
        this.setState({ weddingProfile });
    };

    onContentChange = ({ target: { value } }: { target: { value: string } }) => {
        const weddingProfile = Object.assign({}, this.state.weddingProfile, { giftListContent: value });
        this.setState({ weddingProfile });
    };

    onCheck = ({ target: { name } }: { target: { name: string } }, checked: boolean) => {
        const weddingProfile = Object.assign({}, this.state.weddingProfile, { [name]: checked });
        this.setState({ weddingProfile });
    };

    onSubmit = (event: SyntheticEvent) => {
        event.preventDefault();

        const { actions: { updateWeddingProfile } } = this.props;
        const { weddingProfile } = this.state;

        updateWeddingProfile(weddingProfile);
    };

    handleOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    render() {
        const { loading, saving } = this.props;
        const { weddingProfile, open } = this.state;

        return (
            <WeddingProfileForm
                weddingProfile={weddingProfile}
                onChange={this.onChange}
                onDateChange={this.onDateChange}
                onCheck={this.onCheck}
                onContentChange={this.onContentChange}
                onSubmit={this.onSubmit}
                loading={loading}
                saving={saving}
                open={open}
                handleOpen={this.handleOpen}
                handleClose={this.handleClose}
            />
        );
    }
}
