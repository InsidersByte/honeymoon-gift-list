/* @flow */

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../redux/basket';
import BasketSummary from '../components/BasketSummary';

type PropsType = {
    basket: Map<number, Object>,
    basketCount: number,
    basketTotal: number,
    actions: {
        addToBasket: Function,
        removeFromBasket: Function,
        deleteFromBasket: Function,
    },
};

@connect(
    ({ basket }) => {
        let basketCount = 0;
        let basketTotal = 0;

        for (const item of basket.values()) {
            const { quantity, price } = item;
            basketCount += quantity;
            basketTotal += price * quantity;
        }

        return {
            basket,
            basketCount,
            basketTotal,
        };
    },
    dispatch => ({ actions: bindActionCreators(actions, dispatch) }),
)
export default class BasketSummaryPage extends React.Component {
    props: PropsType;

    addToBasket = (item: Object) => {
        this.props.actions.addToBasket(item);
    };

    removeFromBasket = (item: Object) => {
        this.props.actions.removeFromBasket(item);
    };

    deleteFromBasket = (item: Object) => {
        this.props.actions.deleteFromBasket(item);
    };

    render() {
        const { basket, basketCount, basketTotal } = this.props;

        return (
            <BasketSummary
                basket={basket}
                basketCount={basketCount}
                basketTotal={basketTotal}
                addToBasket={this.addToBasket}
                removeFromBasket={this.removeFromBasket}
                deleteFromBasket={this.deleteFromBasket}
            />
        );
    }
}
