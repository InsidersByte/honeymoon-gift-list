/* @flow */

import React from 'react';
import { Paper, Toolbar, ToolbarGroup, ToolbarTitle, TextField } from 'material-ui';
import ProgressButton from './ProgressButton';
import Form from './Form';

type PropsType = {
  user: {
    email: string,
    name: string,
    password: string,
    confirmPassword: string,
  },
  saving: boolean,
  loading: boolean,
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
  checkbox: {
    marginTop: 12,
  },
  button: {
    marginTop: 12,
  },
};

export default function SignUpForm({ user, saving, loading, onChange, onSubmit }: PropsType) {
  const { email, name, password, confirmPassword } = user;

  return (
    <Paper>
      <Toolbar>
        <ToolbarGroup>
          <ToolbarTitle text="Sign Up" />
        </ToolbarGroup>
      </Toolbar>

      <Form onSubmit={onSubmit} loading={loading} saving={saving} style={styles.form}>
        <TextField id="email" value={email} floatingLabelText="Email" fullWidth style={styles.input} disabled />

        <TextField name="name" floatingLabelText="Name" value={name} onChange={onChange} fullWidth style={styles.input} disabled={saving} required />

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

        <ProgressButton saving={saving} label="Create Account" style={styles.button} />
      </Form>
    </Paper>
  );
}
