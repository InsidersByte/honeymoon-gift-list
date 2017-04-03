/* @flow */

import React, { Component } from 'react';
import MarkdownRenderer from 'react-markdown-renderer';
import LandingItem from '../LandingItem';

type PropsType = {
  title: string,
  content: string,
};

export default class LandingSection extends Component<void, PropsType, void> {
  landingItem: LandingItem;

  scrollTo = () => {
    const landingItem = this.landingItem;
    landingItem.scrollTo();
  };

  render() {
    const { title, content } = this.props;

    return (
      <LandingItem
        title={title}
        ref={c => {
          this.landingItem = c;
        }}
      >
        <MarkdownRenderer markdown={content} />
      </LandingItem>
    );
  }
}
