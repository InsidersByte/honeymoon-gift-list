/* @flow */

import React from 'react';
import { Link } from 'react-router';
import ShoppingCart from 'material-ui/svg-icons/action/shopping-cart';
import { white } from 'material-ui/styles/colors';
import { BASKET_ROUTE } from '../constants/routes';
import css from './LandingBasket.styl';

type PropsType = {
    count: number,
    total: number,
};

export default function LandingBasket({ count, total }: PropsType) {
    if (count <= 0) {
        return null;
    }

    return (
        <section className={css.root}>
            <div>
                <ShoppingCart color={white} />
            </div>

            <div>
                {count} item(s)
            </div>

            <div>
                £{total}
            </div>

            <Link to={BASKET_ROUTE} className="btn btn-success btn-sm">
                Basket
            </Link>
        </section>
    );
}
