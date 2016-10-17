/* @flow */

import React from 'react';

type PropsType = {
    children: React$Element<any>,
};

const styles = {
    root: {
        height: '75%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
};

export default function AdminLoggedIn({ children }: PropsType) {
    return (
        <div style={styles.root}>
            {children}
        </div>
    );
}
