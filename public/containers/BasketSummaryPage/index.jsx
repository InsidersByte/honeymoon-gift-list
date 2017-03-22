/* @flow */

import { connect } from 'react-redux';
import type { Connector } from 'react-redux';
import { addToBasket, removeFromBasket, deleteFromBasket } from '../../redux/basket';
import { getBasketCount, getBasketTotal } from '../../redux';
import BasketSummary from '../../components/BasketSummary';
import type { StateType, BasketType, ItemType } from '../../types';

type PropsType = {
    basket: BasketType,
    basketCount: number,
    basketTotal: number,
    addToBasket: (item: ItemType) => void,
    removeFromBasket: (item: ItemType) => void,
    deleteFromBasket: (item: ItemType) => void,
};

const mapStateToProps = (state: StateType) => ({
    basket: state.basket,
    basketCount: getBasketCount(state),
    basketTotal: getBasketTotal(state),
});

const connector: Connector<PropsType, PropsType> = connect(
    mapStateToProps,
    { addToBasket, removeFromBasket, deleteFromBasket },
);

export default connector(BasketSummary);
