/* @flow */

import React, { Component } from 'react';
import { RaisedButton } from 'material-ui';
import AddCircleOutline from 'material-ui/svg-icons/action/add-shopping-cart';
// FIXME:FLOW need to fix import .styl
import css from './LandingGift.styl';

type PropsType = {
    gift: {
        id: number,
        name: string,
        imageUrl: string,
        price: number,
        remaining: number,
    },
    addToBasket: Function,
};

export default class LandingGift extends Component {
    props: PropsType;

    onClick = () => {
        this.props.addToBasket(this.props.gift);
    };

    render() {
        const { gift: { name, imageUrl, price, remaining } } = this.props;

        const backgroundImageStyle = { backgroundImage: `url(${imageUrl})` };

        return (
            <div className={css.root}>
                <div className={css.avatar} style={backgroundImageStyle} />

                <div className={css.content}>
                    <h4>{name}</h4>
                    <p>Remaining: {remaining} Coming Soon!</p>

                    <RaisedButton
                        primary
                        label={`Add to Basket £${price}`}
                        onClick={this.onClick}
                        icon={<AddCircleOutline />}
                    />
                </div>
            </div>
        );
    }
}
