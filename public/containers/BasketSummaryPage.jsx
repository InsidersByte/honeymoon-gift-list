/* @flow */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import type { Connector } from 'react-redux';
import { addToBasket, removeFromBasket, deleteFromBasket } from '../redux/basket';
import BasketSummary from '../components/BasketSummary';
import type { StateType, DispatchType, BasketType, ItemType } from '../types';

type PropsType = {
    basket: BasketType,
    basketCount: number,
    basketTotal: number,
    actions: {
        addToBasket: Function,
        removeFromBasket: Function,
        deleteFromBasket: Function,
    },
};

const mapStateToProps = ({ basket }: StateType) => {
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
};

const mapDispatchToProps = (dispatch: DispatchType) => ({ actions: bindActionCreators({ addToBasket, removeFromBasket, deleteFromBasket }, dispatch) });

export class BasketSummaryPage extends Component<void, PropsType, void> {
    addToBasket = (item: ItemType): void => {
        this.props.actions.addToBasket(item);
    };

    removeFromBasket = (item: ItemType): void => {
        this.props.actions.removeFromBasket(item);
    };

    deleteFromBasket = (item: ItemType): void => {
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

const connector: Connector<PropsType, PropsType> = connect(
    mapStateToProps,
    mapDispatchToProps,
);

export default connector(BasketSummaryPage);
