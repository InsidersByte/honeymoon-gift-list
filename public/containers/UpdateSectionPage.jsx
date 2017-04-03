/* @flow */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/section';
import SectionForm from '../components/SectionForm';

type PropsType = {
  loading: boolean,
  saving: boolean,
  section: {
    id: number,
    title: string,
    content: string,
    hidden: boolean,
  },
  params: {
    id: string,
  },
  actions: {
    loadSection: Function,
    updateSection: Function,
  },
};

@connect(({ section }) => section, dispatch => ({ actions: bindActionCreators(actions, dispatch) }))
export default class CreateSectionPage extends Component {
  props: PropsType;

  state = {
    section: this.props.section,
    open: false,
  };

  componentDidMount() {
    const { params: { id }, actions: { loadSection } } = this.props;
    loadSection(id);
  }

  componentWillReceiveProps({ section }: PropsType) {
    if (section.id !== this.state.section.id) {
      this.setState({ section: { ...section } });
    }
  }

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

    const { actions: { updateSection } } = this.props;
    const { section } = this.state;

    updateSection(section);
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { loading, saving } = this.props;
    const { section, open } = this.state;

    return (
      <SectionForm
        loading={loading}
        saving={saving}
        type="Update"
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
