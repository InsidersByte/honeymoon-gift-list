/* @flow */

import React from 'react';

type PropsType = {
    children: React$Element<any>,
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

const AdminLoggedIn = ({ children }: PropsType) => (
    <div style={styles.root}>
        <div style={styles.container}>
            {children}
        </div>
    </div>
);

export default AdminLoggedIn;
