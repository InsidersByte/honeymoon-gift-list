/* @flow */

import React from 'react';
import ReactLoader from 'react-loader';

type PropsType = {
  loading: boolean,
  className?: string,
  children?: React$Element<any>,
};

export default function Loader(props: PropsType) {
  const { loading = true, className, children } = props;

  return (
    <ReactLoader {...props} loadedClassName={className} loaded={!loading}>
      {children}
    </ReactLoader>
  );
}
