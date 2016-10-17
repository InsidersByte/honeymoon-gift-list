/* @flow */

import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { AppBar } from 'material-ui';
import { spacing } from 'material-ui/styles';
import withWidth, { LARGE } from 'material-ui/utils/withWidth';
import * as actions from '../actions/auth';
import NavigationDrawer from '../components/NavigationDrawer';

type PropsType = {
    isAuthenticated: boolean,
    width: number,
    user: {
        name: string,
    },
    actions: {
        logout: Function,
    },
    router: Object,
    children: React$Element<any>,
};

@withWidth({ largeWidth: 1200 })
@withRouter
@connect(
    ({ auth }) => auth,
    dispatch => ({ actions: bindActionCreators(actions, dispatch) })
)
export default class AdminLoggedIn extends Component {
    props: PropsType;

    state = {
        navDrawerOpen: false,
    };

    getStyles() {
        return {
            root: {},
            container: {
                margin: `${spacing.desktopGutter * 2}px ${spacing.desktopGutter * 3}px`,
            },
        };
    }

    handleTouchTapLeftIconButton = () => {
        this.setState({ navDrawerOpen: !this.state.navDrawerOpen });
    };

    handleRequestChange = (open: boolean) => {
        this.setState({ navDrawerOpen: open });
    };

    handleChangeList = (event: SyntheticEvent, value: string) => {
        const { router } = this.props;

        router.push(value);

        this.setState({ navDrawerOpen: false });
    };

    logout = (event: SyntheticEvent) => {
        event.preventDefault();
        this.props.actions.logout();
        this.setState({ navDrawerOpen: false });
    };

    render() {
        const { isAuthenticated, user, children, width } = this.props;
        const { navDrawerOpen } = this.state;
        let docked = false;

        const styles = this.getStyles();
        let open = navDrawerOpen;

        if (width === LARGE) {
            open = true;
            docked = true;
            styles.root.paddingLeft = 256;
        }

        return (
            <div style={styles.root}>
                <AppBar
                    title="Our Wedding Heroes"
                    onLeftIconButtonTouchTap={this.handleTouchTapLeftIconButton}
                    showMenuIconButton={!docked}
                />

                <NavigationDrawer
                    docked={docked}
                    open={open}
                    onRequestChange={this.handleRequestChange}
                    onChange={this.handleChangeList}
                    location={location}
                    logout={this.logout}
                    user={user}
                    isAuthenticated={isAuthenticated}
                />

                <div style={styles.container}>
                    {children}
                </div>
            </div>
        );
    }
}
