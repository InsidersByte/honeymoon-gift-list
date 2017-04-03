/* @flow */

import React from 'react';
import { Paper, Toolbar, ToolbarGroup, ToolbarTitle, TextField } from 'material-ui';
import ProgressButton from './ProgressButton';
import Form from './Form';

type PropsType = {
  user: {
    name: string,
    email: string,
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
  checkbox: {
    marginTop: 12,
  },
  button: {
    marginTop: 12,
  },
};

export default function SetupForm({ user: { name, email, password, confirmPassword }, saving, onChange, onSubmit }: PropsType) {
  return (
    <Paper>
      <Toolbar>
        <ToolbarGroup>
          <ToolbarTitle text="Setup" />
        </ToolbarGroup>
      </Toolbar>

      <Form onSubmit={onSubmit} loading={false} saving={saving} style={styles.form}>
        <TextField name="name" floatingLabelText="Name" value={name} onChange={onChange} fullWidth style={styles.input} disabled={saving} required />

        <TextField
          name="email"
          type="email"
          floatingLabelText="Email"
          value={email}
          onChange={onChange}
          fullWidth
          style={styles.input}
          disabled={saving}
          required
        />

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

        <ProgressButton saving={saving} label="Setup" style={styles.button} />
      </Form>
    </Paper>
  );
}
