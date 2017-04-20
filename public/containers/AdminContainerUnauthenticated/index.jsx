/* @flow */

import React from 'react';

type PropsType = {
  children?: ReactClass<*>,
};

const styles = {
  root: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: '8vh',
  },
  container: {
    margin: '0 5%',
  },
};

const AdminContainerUnauthenticated = ({ children }: PropsType) => (
  <div style={styles.root}>
    <div style={styles.container}>
      {children}
    </div>
  </div>
);

export default AdminContainerUnauthenticated;
