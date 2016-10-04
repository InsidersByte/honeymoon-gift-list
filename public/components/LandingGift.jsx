/* @flow */

import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import FontAwesome from './FontAwesome';
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

                    <Button bsStyle="success" onClick={this.onClick}>
                        <FontAwesome icon="shopping-basket" /> Add to Basket £ {price}
                    </Button>
                </div>
            </div>
        );
    }
}
