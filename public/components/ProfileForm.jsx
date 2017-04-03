/* @flow */

import React from 'react';
import { Paper, Toolbar, ToolbarGroup, ToolbarTitle, TextField } from 'material-ui';
import ProgressButton from './ProgressButton';
import Form from './Form';

type PropsType = {
  saving: boolean,
  user: {
    currentPassword: string,
    newPassword: string,
    confirmPassword: string,
  },
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
  },
};

export default function ProfileForm({ user: { currentPassword, newPassword, confirmPassword }, saving, onChange, onSubmit }: PropsType) {
  return (
    <Paper>
      <Toolbar>
        <ToolbarGroup>
          <ToolbarTitle text="Change Your Password" />
        </ToolbarGroup>
      </Toolbar>

      <Form onSubmit={onSubmit} loading={false} saving={saving} style={styles.form}>
        <TextField
          name="currentPassword"
          type="password"
          floatingLabelText="Current Password"
          value={currentPassword}
          onChange={onChange}
          fullWidth
          style={styles.input}
          disabled={saving}
          required
        />

        <TextField
          name="newPassword"
          type="password"
          floatingLabelText="New Password"
          value={newPassword}
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

        <ProgressButton saving={saving} label="Change Passsword" style={styles.button} />
      </Form>
    </Paper>
  );
}
