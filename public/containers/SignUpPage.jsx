import React, { Component, PropTypes } from 'react';
import AltContainer from 'alt-container';
import { withRouter } from 'react-router';
import SignUpStore from '../stores/SignUpStore';
import actions from '../actions/SignUpActions';

@withRouter
export default class SignUpPage extends Component {
    static propTypes = {
        params: PropTypes.shape({
            token: PropTypes.string.isRequired,
        }),
    };

    componentDidMount() {
        actions.fetch(this.props.params.token);
    }

    render() {
        return (
            <AltContainer store={SignUpStore}>
                <h1>Coming Soon!</h1>
            </AltContainer>
        );
    }
}
