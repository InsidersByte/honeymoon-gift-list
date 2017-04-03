/* @flow */

import React, { Component } from 'react';
import smoothscroll from 'smoothscroll';
import css from './index.styl';

type PropsType = {
  title: string,
  children?: React$Element<any>,
  postContent?: React$Element<any>,
};

export default class LandingItem extends Component<void, PropsType, void> {
  container: any;

  scrollTo = () => {
    const container = this.container;
    smoothscroll(container);
  };

  render() {
    const { title, children, postContent } = this.props;

    return (
      <section
        ref={c => {
          this.container = c;
        }}
        className={css.root}
      >
        <h1 className={css.title}>{title}</h1>

        <div className={css.content}>
          {children}
        </div>

        {postContent}
      </section>
    );
  }
}
