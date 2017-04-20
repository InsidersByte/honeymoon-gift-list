/* @flow */

import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { AppBar } from 'material-ui';
import { spacing } from 'material-ui/styles';
import withWidth, { LARGE } from 'material-ui/utils/withWidth';
import type { Connector } from 'react-redux';
import type { RouterHistory } from 'react-router-dom';
import { logout } from '../actions/auth';
import NavigationDrawer from '../components/NavigationDrawer';

type OwnPropsType = {};

type PropsType = OwnPropsType & {
  isAuthenticated: boolean,
  width: number,
  user: {
    name: string,
  },
  logout: () => void,
  history: RouterHistory,
  children?: ReactClass<*>,
};

type StateType = {
  navDrawerOpen: boolean,
};

const getStyles = () => ({
  root: {},
  container: {
    margin: spacing.desktopGutter,
  },
});

const mapStateToProps = ({ auth }) => auth;
const mapDispatchToProps = { logout };

export class AdminContainerAuthenticated extends Component<void, PropsType, StateType> {
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
    const { history } = this.props;

    history.push(value);

    this.setState({ navDrawerOpen: false });
  };

  logout = (event: SyntheticEvent) => {
    event.preventDefault();
    this.props.logout();
    this.setState({ navDrawerOpen: false });
  };

  render() {
    const { isAuthenticated, user, children, width } = this.props;
    const { navDrawerOpen } = this.state;
    let docked = false;

    if (!isAuthenticated) {
      throw new Error('This component can only be rendered if logged in');
    }

    const styles = getStyles();
    let open = navDrawerOpen;

    if (width === LARGE) {
      open = true;
      docked = true;
      styles.root.paddingLeft = 256;
    }

    return (
      <div style={styles.root}>
        <AppBar title="Our Wedding Heroes" onLeftIconButtonTouchTap={this.handleTouchTapLeftIconButton} showMenuIconButton={!docked} />

        <NavigationDrawer
          docked={docked}
          open={open}
          onRequestChange={this.handleRequestChange}
          onChange={this.handleChangeList}
          location={location}
          logout={this.logout}
          user={user}
        />

        <div style={styles.container}>
          {children}
        </div>
      </div>
    );
  }
}

const connector: Connector<OwnPropsType, PropsType> = connect(mapStateToProps, mapDispatchToProps);

export default withWidth({ largeWidth: 1200 })(withRouter(connector(AdminContainerAuthenticated)));
