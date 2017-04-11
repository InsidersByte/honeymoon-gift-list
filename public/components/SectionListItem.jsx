/* @flow */

import React, { Component } from 'react';
import { IconButton } from 'material-ui';
import Edit from 'material-ui/svg-icons/image/edit';
import Delete from 'material-ui/svg-icons/action/delete';
import Visibility from 'material-ui/svg-icons/action/visibility';
import VisibilityOff from 'material-ui/svg-icons/action/visibility-off';
import type { SectionType } from '../types';
import css from './SectionListItem.styl';

type PropsType = {
  section: SectionType,
  onSelect: Function,
  onDelete: Function,
};

export default class SectionListItem extends Component<void, PropsType, void> {
  onSelect = () => {
    this.props.onSelect(this.props.section);
  };

  onDelete = () => {
    this.props.onDelete(this.props.section);
  };

  render() {
    const { section: { title, hidden } } = this.props;

    const style = { opacity: hidden ? 0.4 : 1 };

    return (
      <div className={css.root} style={style}>
        <div className={css.textContainer}>
          <h3 className={css.title}>{title}</h3>
        </div>

        <IconButton touch onClick={this.onSelect}>
          <Edit />
        </IconButton>

        <IconButton disabled>
          {hidden ? <VisibilityOff /> : <Visibility />}
        </IconButton>

        <IconButton touch onClick={this.onDelete}>
          <Delete />
        </IconButton>
      </div>
    );
  }
}
