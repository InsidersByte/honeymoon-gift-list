/* @flow */

import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/giftSet';
import GiverDetailsForm from '../components/GiverDetailsForm';
import { HOME_ROUTE } from '../constants/routes';

type PropsType = {
    saving: boolean,
    basket: Map<number, Object>,
    basketCount: number,
    router: {
        replace: Function,
    },
    actions: {
        createGiftSet: Function,
    },
};

@withRouter
@connect(
    ({ basket }) => {
        let basketCount = 0;

        for (const item of basket.values()) {
            const { quantity } = item;
            basketCount += quantity;
        }

        return {
            basket,
            basketCount,
        };
    },
    dispatch => ({ actions: bindActionCreators(actions, dispatch) })
)
export default class GiverDetailsPage extends React.Component {
    props: PropsType;

    state = {
        giver: {
            forename: '',
            surname: '',
            email: '',
            phoneNumber: '',
            paymentMethod: '',
        },
    };

    componentWillMount() {
        const { basketCount, router: { replace } } = this.props;

        if (basketCount <= 0) {
            replace(HOME_ROUTE);
        }
    }

    onChange = ({ target: { name, value } }: { target: { name: string, value: string } }) => {
        const giver = Object.assign({}, this.state.giver, { [name]: value });
        return this.setState({ giver });
    };

    onSubmit = (event: SyntheticEvent) => {
        event.preventDefault();

        const { basket, actions: { createGiftSet } } = this.props;

        createGiftSet({
            giver: this.state.giver,
            // FIXME:FLOW this does work?
            basket: [...basket.values()],
        });
    };

    render() {
        const { saving } = this.props;
        const { giver } = this.state;

        return (
            <GiverDetailsForm
                giver={giver}
                saving={saving}
                onChange={this.onChange}
                onSubmit={this.onSubmit}
            />
        );
    }
}
