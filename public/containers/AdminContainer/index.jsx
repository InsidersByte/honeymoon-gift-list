// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import type { Connector } from 'react-redux';
import AdminContainerAuthenticated from '../AdminContainerAuthenticated';
import AdminContainerUnauthenticated from '../AdminContainerUnauthenticated';
import type { StateType } from '../../types';

type OwnPropsType = {
  children?: ReactClass<*>,
};

type PropsType = OwnPropsType & {
  isAuthenticated: boolean,
};

const mapStateToProps = ({ auth: { isAuthenticated } }: StateType) => ({ isAuthenticated });

// eslint-disable-next-line react/prefer-stateless-function
export class AdminContainer extends Component<void, PropsType, void> {
  render() {
    const { isAuthenticated, children } = this.props;

    return isAuthenticated
      ? <AdminContainerAuthenticated>{children}</AdminContainerAuthenticated>
      : <AdminContainerUnauthenticated>{children}</AdminContainerUnauthenticated>;
  }
}

const connector: Connector<OwnPropsType, PropsType> = connect(mapStateToProps);

export default connector(AdminContainer);
