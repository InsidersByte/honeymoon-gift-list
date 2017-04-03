/* @flow */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/section';
import SectionForm from '../components/SectionForm';

type PropsType = {
  saving: boolean,
  actions: {
    createSection: Function,
  },
};

@connect(({ section }) => section, dispatch => ({ actions: bindActionCreators(actions, dispatch) }))
export default class CreateSectionPage extends Component {
  props: PropsType;

  state = {
    section: {
      title: '',
      content: '',
      hidden: false,
    },
    open: false,
  };

  onChange = ({ target: { name, value } }: { target: { name: string, value: string } }) => {
    const section = Object.assign(this.state.section, { [name]: value });
    this.setState({ section });
  };

  onCheck = ({ target: { name } }: { target: { name: string } }, checked: boolean) => {
    const section = Object.assign({}, this.state.section, { [name]: checked });
    this.setState({ section });
  };

  onContentChange = ({ target: { value } }: { target: { value: string } }) => {
    const section = Object.assign({}, this.state.section, { content: value });
    this.setState({ section });
  };

  onSubmit = (event: SyntheticEvent) => {
    event.preventDefault();

    const { actions: { createSection } } = this.props;
    const { section } = this.state;

    createSection(section);
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { saving } = this.props;
    const { section, open } = this.state;

    return (
      <SectionForm
        loading={false}
        saving={saving}
        type="Create"
        section={section}
        open={open}
        onChange={this.onChange}
        onCheck={this.onCheck}
        onContentChange={this.onContentChange}
        onSubmit={this.onSubmit}
        handleOpen={this.handleOpen}
        handleClose={this.handleClose}
      />
    );
  }
}
