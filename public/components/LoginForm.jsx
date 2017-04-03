/* @flow */

import React from 'react';
import { Paper, Toolbar, ToolbarGroup, ToolbarTitle, TextField, RaisedButton } from 'material-ui';
import ProgressButton from './ProgressButton';
import Form from './Form';

type PropsType = {
  user: {
    email: string,
    password: string,
  },
  onChange: Function,
  onForgot: Function,
  onSubmit: Function,
  saving: boolean,
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

export default function LoginForm({ user: { email, password }, onChange, onForgot, onSubmit, saving }: PropsType) {
  return (
    <Paper>
      <Toolbar>
        <ToolbarGroup>
          <ToolbarTitle text="Login" />
        </ToolbarGroup>
      </Toolbar>

      <Form onSubmit={onSubmit} loading={false} saving={saving} style={styles.form}>
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

        <ProgressButton saving={saving} label="Login" style={styles.button} />
        <RaisedButton label="Forgotten Password?" onClick={onForgot} disabled={saving} style={styles.button} />
      </Form>
    </Paper>
  );
}
