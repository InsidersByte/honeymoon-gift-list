/* @flow */

import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { AppBar } from 'material-ui';
import { getMuiTheme, MuiThemeProvider, spacing } from 'material-ui/styles';
import * as actions from '../actions/auth';
import NavigationDrawer from '../components/NavigationDrawer';

type PropsType = {
    isAuthenticated: boolean,
    user: {
        name: string,
    },
    actions: {
        logout: Function,
    },
    router: Object,
    children: React$Element<any>,
};

const styles = {
    root: {},
    container: {
        margin: `${spacing.desktopGutter * 2}px ${spacing.desktopGutter * 3}px`,
    },
};

const muiTheme = getMuiTheme();

@withRouter
@connect(
    (state) => {
        const { auth: { user, isAuthenticated } } = state;

        return {
            user,
            isAuthenticated,
        };
    },
    dispatch => ({ actions: bindActionCreators(actions, dispatch) })
)
export default class Admin extends Component {
    props: PropsType;

    state = {
        navDrawerOpen: false,
    };

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
        const { isAuthenticated, user, children } = this.props;
        const { navDrawerOpen } = this.state;

        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <div style={styles.root}>
                    <AppBar
                        onLeftIconButtonTouchTap={this.handleTouchTapLeftIconButton}
                        title="Our Wedding Heroes"
                    />

                    <NavigationDrawer
                        docked={false}
                        open={navDrawerOpen}
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
            </MuiThemeProvider>
        );
    }
}
