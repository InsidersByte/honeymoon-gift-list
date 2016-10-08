/* @flow */

import React from 'react';
import { Link } from 'react-router';
import { HOME_ROUTE } from '../constants/routes';

const styles = {
    root: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        minHeight: '75%',
    },
    title: {
        marginBottom: 15,
    },
    content: {
        marginBottom: 20,
    },
};

export default function NoMatch() {
    return (
        <div style={styles.root}>
            <h1 style={styles.title}>Page not found</h1>

            <div style={styles.content}>
                Woops! Sorry, there is nothing to see here.
            </div>

            <Link to={HOME_ROUTE}>Back to Home</Link>
        </div>
    );
}
