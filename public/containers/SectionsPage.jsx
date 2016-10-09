/* @flow */

import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/section';
import SectionList from '../components/SectionList';

type PropsType = {
    loading: boolean,
    deleting: boolean,
    sections: Array<{
        id: number,
        title: string,
        hidden: boolean,
    }>,
    actions: {
        loadSections: Function,
        updateSection: Function,
        deleteSection: Function,
        moveSection: Function,
    },
    router: {
        push: Function,
    },
};

@withRouter
@connect(
    ({ sections: { sections, ...state } }) => {
        const sortedSections = sections.sort((a, b) => a.position - b.position);

        return {
            ...state,
            sections: sortedSections,
        };
    },
    dispatch => ({ actions: bindActionCreators(actions, dispatch) })
)
export default class SectionsPage extends Component {
    props: PropsType;

    componentDidMount() {
        this.props.actions.loadSections();
    }

    // FIXME: This seems like a bit of a hack
    componentWillReceiveProps({ deleting: nextDeleting }: PropsType) {
        const { deleting, actions: { loadSections } } = this.props;

        if (deleting && !nextDeleting) {
            loadSections();
        }
    }

    onAdd = () => {
        alert('coming soon!');
    };

    onSelect = (/* member: Object */) => {
        alert('coming soon!');
    };

    onToggleVisibility = (/* section: Object */) => {
        alert('coming soon!');
    };

    onDrop = ({ id }: Object) => {
        const sections = this.props.sections.find(o => o.id === id);
        this.props.actions.updateSection(sections);
    };

    onDelete = (section: Object) => {
        if (!confirm('Are you sure you want to delete this section?')) {
            return;
        }

        this.props.actions.deleteSection(section);
    };

    render() {
        const { loading, sections, actions: { moveSection } } = this.props;

        return (
            <SectionList
                loading={loading}
                sections={sections}
                onAdd={this.onAdd}
                onSelect={this.onSelect}
                onMove={moveSection}
                onDrop={this.onDrop}
                onToggleVisibility={this.onToggleVisibility}
                onDelete={this.onDelete}
            />
        );
    }
}
