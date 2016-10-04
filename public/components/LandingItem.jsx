/* @flow */

import React, { Component } from 'react';
import smoothscroll from 'smoothscroll';
// FIXME:FLOW need to fix import .styl
import css from './LandingItem.styl';

type PropsType = {
    title: string,
    children?: React$Element<any>,
};

export default class LandingItem extends Component {
    props: PropsType;

    container: any;

    scrollTo = () => {
        const container = this.container;
        smoothscroll(container);
    };

    render() {
        const { title, children } = this.props;

        return (
            <section ref={(c) => { this.container = c; }} className={css.root}>
                <h1 className={css.title}>{title}</h1>

                <div className={css.content}>
                    {children}
                </div>
            </section>
        );
    }
}
