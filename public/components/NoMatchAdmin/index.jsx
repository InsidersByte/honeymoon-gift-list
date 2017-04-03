/* @flow */

import React from 'react';
import { Link } from 'react-router';
import { ADMIN_ROUTE } from '../../constants/routes';

const NoMatchAdmin = () => (
  <div>
    <h1>Page not found</h1>

    <p>Woops! Sorry, there is nothing to see here.</p>

    <p><Link to={ADMIN_ROUTE}>Back to Admin</Link></p>
  </div>
);

export default NoMatchAdmin;
