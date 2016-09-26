/* @flow */

import React, { Component, PropTypes } from 'react';
import { withRouter } from 'react-router';
import connect from 'alt-utils/lib/connectToStores';
import { AppBar } from 'material-ui';
import { getMuiTheme, MuiThemeProvider, spacing } from 'material-ui/styles';
import LoginActions from '../actions/LoginActions';
import LoginStore from '../stores/LoginStore';
import NavigationDrawer from '../components/NavigationDrawer';

const muiTheme = getMuiTheme();

const styles = {
    root: {},
    container: {
        margin: `${spacing.desktopGutter * 2}px ${spacing.desktopGutter * 3}px`
    },
};

@withRouter
@connect
export default class Admin extends Component {
    static propTypes = {
        isLoggedIn: PropTypes.bool.isRequired,
        user: PropTypes.shape({
            name: PropTypes.string,
        }),
        router: PropTypes.shape({}).isRequired,
        children: PropTypes.element.isRequired,
    };

    static getStores = () => [LoginStore];
    static getPropsFromStores = () => LoginStore.getState();

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

        this.setState({
            navDrawerOpen: false,
        });
    };

    logout(event: SyntheticEvent) {
        event.preventDefault();
        LoginActions.logoutUser();
    }

    render() {
        const { isLoggedIn, user, children } = this.props;
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
                        isAuthenticated={isLoggedIn}
                    />

                    <div style={styles.container}>
                        {children}
                    </div>
                </div>
            </MuiThemeProvider>
        );
    }
}
