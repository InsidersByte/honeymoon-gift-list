/* @flow */

import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import type { Connector } from 'react-redux';
import { loadSections, updateSection, deleteSection, moveSection } from '../../redux/sections';
import { CREATE_SECTION_ROUTE, updateSectionRoute } from '../../constants/routes';
import SectionList from '../../components/SectionList';
import type { SectionsType, SectionType, SectionIdType } from '../../types';

type PropsType = {
  loading: boolean,
  deleting: boolean,
  sections: SectionsType,
  loadSections: () => void,
  updateSection: (section: SectionType) => void,
  deleteSection: (section: SectionType) => void,
  moveSection: ({ sourceId: SectionIdType, targetId: SectionIdType }) => void,
  router: {
    push: (route: string) => void,
  },
};

const mapStateToProps = ({ sections: { sections, isLoading, isDeleting } }) => {
  const sortedSections = sections.sort((a, b) => a.position - b.position);

  return {
    loading: isLoading,
    deleting: isDeleting,
    sections: sortedSections,
  };
};

const mapDispatchToProps = { loadSections, updateSection, deleteSection, moveSection };

export class SectionsPage extends Component<void, PropsType, void> {
  componentDidMount() {
    this.props.loadSections();
  }

  onAdd = () => {
    this.props.router.push(CREATE_SECTION_ROUTE);
  };

  onSelect = ({ id }: SectionType) => {
    this.props.router.push(updateSectionRoute(id));
  };

  onDrop = ({ id }: SectionType) => {
    const section = this.props.sections.find(o => o.id === id);

    if (!section) {
      // TODO: Error?
      return;
    }

    this.props.updateSection(section);
  };

  onDelete = (section: SectionType) => {
    if (!confirm('Are you sure you want to delete this section?')) {
      return;
    }

    this.props.deleteSection(section);
  };

  render() {
    const { loading, sections, moveSection: onMove } = this.props;

    return (
      <SectionList
        loading={loading}
        sections={sections}
        onAdd={this.onAdd}
        onSelect={this.onSelect}
        onMove={onMove}
        onDrop={this.onDrop}
        onDelete={this.onDelete}
      />
    );
  }
}

const connector: Connector<PropsType, PropsType> = connect(mapStateToProps, mapDispatchToProps);

export default withRouter(connector(SectionsPage));
