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

export default function AdminLoggedIn({ children }: PropsType) {
    return (
        <div style={styles.root}>
            <div style={styles.container}>
                {children}
            </div>
        </div>
    );
}
