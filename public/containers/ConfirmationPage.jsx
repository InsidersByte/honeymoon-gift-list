/* @flow */

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/giftSet';
import Confirmation from '../components/Confirmation';

type PropsType = {
    loading: boolean,
    giftSet: {
        paymentMethod: string,
        paypalLink: string,
    },
    params: {
        giftSetId: string,
    },
    actions: {
        loadGiftSet: Function,
    },
};

@connect(
    ({ giftSet }) => giftSet,
    dispatch => ({ actions: bindActionCreators(actions, dispatch) })
)
export default class ConfirmationPage extends React.Component {
    props: PropsType;

    state = { linkClicked: false };

    componentDidMount() {
        const { params: { giftSetId }, actions: { loadGiftSet } } = this.props;
        loadGiftSet(giftSetId);
    }

    onLinkClicked = () => {
        this.setState({ linkClicked: true });
    };

    render() {
        const { loading, giftSet } = this.props;
        const { linkClicked } = this.state;

        return (
            <Confirmation
                loading={loading}
                giftSet={giftSet}
                onLinkClicked={this.onLinkClicked}
                linkClicked={linkClicked}
            />
        );
    }
}
