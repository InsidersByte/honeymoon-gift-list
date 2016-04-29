import React from 'react';
import landingApi from '../api/landing.api';

import css from './AuthenticatedLanding.styl';

export default class AuthenticatedLanding extends React.Component {
    static propTypes = {
        toastSuccess: React.PropTypes.func,
        toastError: React.PropTypes.func,
    };

    state = {
        info: {},
    };

    componentDidMount() {
        landingApi
            .get()
            .then((response) => {
                this.setState({
                    info: response,
                });
            })
            .catch(() => {
                this.props.toastError('There was an error loading the landing info');
            });
    }

    render() {
        const giftSetCount = this.state.info.giftSetCount || 0;

        const message = giftSetCount <= 0 ?
            'There have been no new gift sets since you last logged in' :
            `There has been ${giftSetCount} new gift set${giftSetCount === 1 ? '' : 's'} since you last logged in!`;

        return (
            <div className={css.root}>
                <h1>{message}</h1>
            </div>
        );
    }
}
