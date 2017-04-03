/* @flow */

import React, { Component } from 'react';
import { RaisedButton } from 'material-ui';
import AddShoppingCart from 'material-ui/svg-icons/action/add-shopping-cart';
import css from './LandingGift.styl';

type PropsType = {
  gift: {
    id: number,
    name: string,
    imageUrl: string,
    price: number,
    remaining: number,
    inStock: number,
  },
  addToBasket: Function,
};

export default class LandingGift extends Component {
  props: PropsType;

  onClick = () => {
    this.props.addToBasket(this.props.gift);
  };

  renderAddToBasketButton = () => {
    const { gift: { inStock, price } } = this.props;

    if (inStock <= 0) {
      return (
        <div>
          <p>&nbsp;</p>

          <RaisedButton label="Fully Gifted!" disabled />
        </div>
      );
    }

    return (
      <div>
        <p>Remaining: {inStock}</p>

        <RaisedButton
          primary
          disableFocusRipple
          disableKeyboardFocus
          disableTouchRipple
          label={`Add to Basket £${price}`}
          onClick={this.onClick}
          icon={<AddShoppingCart />}
        />
      </div>
    );
  };

  render() {
    const { gift: { name, imageUrl } } = this.props;

    const backgroundImageStyle = { backgroundImage: `url(${imageUrl})` };

    return (
      <div className={css.root}>
        <div className={css.avatar} style={backgroundImageStyle} />

        <div className={css.content}>
          <h4>{name}</h4>
          {this.renderAddToBasketButton()}
        </div>
      </div>
    );
  }
}
