/* @flow */

import React from 'react';
import { Dialog, TextField } from 'material-ui';
import Form from './Form';
import ProgressButton from './ProgressButton';

type PropsType = {
  gift: {
    id?: number,
    name: string,
    imageUrl: string,
    requested: number,
    price: number,
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

export default function GiftDialog({ gift: { id, name, imageUrl, requested, price }, open, onHide, onChange, onSubmit, saving }: PropsType) {
  const updating = !!id;
  const action = `${updating ? 'Update' : 'Create'}`;

  return (
    <Dialog title={`${action} a Gift`} open={open} onRequestClose={onHide} contentStyle={styles.dialog}>
      <Form onSubmit={onSubmit} loading={false} saving={saving}>
        <TextField name="name" floatingLabelText="Name" value={name} onChange={onChange} fullWidth style={styles.input} required />

        <TextField name="imageUrl" type="url" floatingLabelText="Image Url" value={imageUrl} onChange={onChange} fullWidth style={styles.input} required />

        <TextField name="requested" type="number" floatingLabelText="Requested" value={requested} onChange={onChange} fullWidth style={styles.input} required />

        <TextField name="price" type="number" floatingLabelText="Price (£)" value={price} onChange={onChange} fullWidth style={styles.input} required />

        <ProgressButton saving={saving} label={action} style={styles.button} fullWidth />
      </Form>
    </Dialog>
  );
}
