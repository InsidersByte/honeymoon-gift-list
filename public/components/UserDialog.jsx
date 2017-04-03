/* @flow */

import React from 'react';
import { Dialog, TextField } from 'material-ui';
import Form from './Form';
import ProgressButton from './ProgressButton';

type PropsType = {
  user: {
    email: string,
  },
  open: boolean,
  onHide: Function,
  onChange: Function,
  onSubmit: Function,
  saving: boolean,
};

const styles = {
  dialog: {
    maxWidth: 550,
  },
  input: {
    margin: '6px 0',
  },
  button: {
    marginTop: 12,
  },
};

export default function UserDialog({ user: { email }, open, onHide, onChange, onSubmit, saving }: PropsType) {
  return (
    <Dialog title="Invite a New User" open={open} onRequestClose={onHide} contentStyle={styles.dialog}>
      <Form onSubmit={onSubmit} loading={false} saving={saving}>
        <TextField name="email" type="email" floatingLabelText="Email" value={email} onChange={onChange} fullWidth style={styles.input} required />

        <ProgressButton saving={saving} label="Send Invitation Now" style={styles.button} fullWidth />
      </Form>
    </Dialog>
  );
}
