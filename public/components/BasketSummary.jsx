/* @flow */

import React from 'react';
import { Link } from 'react-router';
import BasketSummaryTable from './BasketSummaryTable';
import { GIVER_ROUTE, HOME_ROUTE } from '../constants/routes';
import css from './BasketSummary.styl';

type PropsType = {
    basket: Map<number, Object>,
    basketCount: number,
    basketTotal: number,
    addToBasket: Function,
    removeFromBasket: Function,
    deleteFromBasket: Function,
};

export default function BasketSummary({ basket, basketCount, basketTotal, addToBasket, removeFromBasket, deleteFromBasket }: PropsType) {
    if (basketCount <= 0) {
        return (
            <div className={css.root}>
                <div className={css.container}>
                    <h1 className={css.title}>
                        Your Basket is empty!
                    </h1>

                    <div className={css.actions}>
                        <Link
                            to={HOME_ROUTE}
                            className="btn btn-success"
                            role="button"
                        >
                            Back to Home
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={css.root}>
            <div className={css.container}>
                <h1 className={css.title}>
                    Subtotal ({basketCount} items): £{basketTotal}
                </h1>

                <div className={css.content}>
                    <BasketSummaryTable
                        basket={basket}
                        basketTotal={basketTotal}
                        addToBasket={addToBasket}
                        removeFromBasket={removeFromBasket}
                        deleteFromBasket={deleteFromBasket}
                    />
                </div>

                <div className={css.actions}>
                    <Link to={GIVER_ROUTE} className="btn btn-success" role="button">Proceed to Checkout</Link>

                    <Link
                        to={HOME_ROUTE}
                        className="btn btn-default"
                        role="button"
                    >
                        Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
}
