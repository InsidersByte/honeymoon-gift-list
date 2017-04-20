/* @flow */

import React from 'react';
import { Link } from 'react-router-dom';
import { Badge } from 'material-ui';
import ShoppingCart from 'material-ui/svg-icons/action/shopping-cart';
import { white } from 'material-ui/styles/colors';
import { BASKET_ROUTE } from '../constants/routes';
import css from './LandingBasket.styl';

type PropsType = {
  count: number,
  total: number,
};

export default function LandingBasket({ count }: PropsType) {
  if (count <= 0) {
    return null;
  }

  return (
    <section className={css.root}>
      <Link to={BASKET_ROUTE}>
        <Badge primary badgeContent={count}>
          <ShoppingCart color={white} />
        </Badge>
      </Link>
    </section>
  );
}
