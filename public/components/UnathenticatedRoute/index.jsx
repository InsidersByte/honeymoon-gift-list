// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import type { Connector } from 'react-redux';
import { ADMIN_ROUTE } from '../../constants/routes';
import type { StateType } from '../../types';

type OwnPropsType = {
  component: ReactClass<*>,
};

type PropsType = OwnPropsType & {
  isAuthenticated: boolean,
};

const mapStateToProps = ({ auth: { isAuthenticated } }: StateType) => ({ isAuthenticated });

// eslint-disable-next-line react/prefer-stateless-function
export class UnauthenticatedRoute extends Component<void, PropsType, void> {
  render() {
    const { isAuthenticated, component: Comp, ...rest } = this.props;

    return (
      <Route
        {...rest}
        render={props =>
          !isAuthenticated
            ? <Comp {...props} />
            : <Redirect
                to={{
                  pathname: ADMIN_ROUTE,
                  state: { from: props.location },
                }}
              />}
      />
    );
  }
}

const connector: Connector<OwnPropsType, PropsType> = connect(mapStateToProps);

export default connector(UnauthenticatedRoute);
