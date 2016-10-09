/* @flow */

import React from 'react';
import { RaisedButton } from 'material-ui';
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

const styles = {
    button: {
        marginTop: 12,
        marginRight: 12,
    },
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
                        <RaisedButton
                            primary
                            label="Back to Home"
                            containerElement={<Link to={HOME_ROUTE}>Back to Home</Link>}
                            linkButton
                        />
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
                    <RaisedButton
                        primary
                        label="Proceed to Checkout"
                        containerElement={<Link to={GIVER_ROUTE}>Proceed to Checkout</Link>}
                        linkButton
                        style={styles.button}
                    />

                    <RaisedButton
                        label="Back to Home"
                        containerElement={<Link to={HOME_ROUTE}>Back to Home</Link>}
                        linkButton
                        style={styles.button}
                    />
                </div>
            </div>
        </div>
    );
}
