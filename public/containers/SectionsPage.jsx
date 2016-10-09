/* @flow */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/section';
import Sections from '../components/Sections';

type PropsType = {
    loading: boolean,
    sections: Array<{}>,
    actions: {
        loadSections: Function,
    },
};

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

    render() {
        const { loading, sections } = this.props;

        return (
            <Sections
                loading={loading}
                sections={sections}
            />
        );
    }
}
