/* @flow */

import React from 'react';
import { Link } from 'react-router';
import { RaisedButton } from 'material-ui';
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

            <RaisedButton
                primary
                label="Basket"
                containerElement={<Link to={BASKET_ROUTE}>Basket</Link>}
                linkButton
            />
        </section>
    );
}
