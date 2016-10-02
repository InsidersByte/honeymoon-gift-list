/* @flow */

import React from 'react';
import { Paper, Toolbar, ToolbarGroup, ToolbarTitle, TextField } from 'material-ui';
import ProgressButton from './ProgressButton';
import Form from './Form';

type PropsType = {
    user: {
        password: string,
        confirmPassword: string,
    },
    saving: boolean,
    onChange: Function,
    onSubmit: Function,
};

const styles = {
    form: {
        padding: '30px 50px',
        marginBottom: 10,
    },
    input: {
        margin: '6px 0',
    },
    button: {
        marginTop: 12,
        marginRight: 12,
    },
};

export default function ResetPasswordForm({ user: { password, confirmPassword }, saving, onChange, onSubmit }: PropsType) {
    return (
        <Paper>
            <Toolbar>
                <ToolbarGroup>
                    <ToolbarTitle text="Reset Password" />
                </ToolbarGroup>
            </Toolbar>

            <Form onSubmit={onSubmit} loading={false} saving={saving} style={styles.form}>
                <TextField
                    name="password"
                    type="password"
                    floatingLabelText="Password"
                    value={password}
                    onChange={onChange}
                    fullWidth
                    style={styles.input}
                    disabled={saving}
                    required
                />

                <TextField
                    name="confirmPassword"
                    type="password"
                    floatingLabelText="Confirm Password"
                    value={confirmPassword}
                    onChange={onChange}
                    fullWidth
                    style={styles.input}
                    disabled={saving}
                    required
                />

                <ProgressButton saving={saving} label="Reset Password" style={styles.button} />
            </Form>
        </Paper>
    );
}
