import React from 'react';
import { Link } from 'react-router';

export default function NoMatchAdmin() {
    return (
        <div>
            <h1>Page not found</h1>

            <p>Woops! Sorry, there is nothing to see here.</p>

            <p><Link to="/admin">Back to Admin</Link></p>
        </div>
    );
}
