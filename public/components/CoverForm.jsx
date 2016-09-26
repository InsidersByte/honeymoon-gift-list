/* @flow */

import React from 'react';
import { Jumbotron } from 'react-bootstrap';
import { RaisedButton, DatePicker, TextField } from 'material-ui';
import Form from './common/Form';

type PropsType = {
    loading: boolean,
    saving: boolean,
    cover: {
        title: string,
        imageUrl: string,
        weddingDate: Date,
    },
    onChange: Function,
    onDateChange: Function,
    onSubmit: Function,
};

export default function CoverForm({ loading, saving, onSubmit, onChange, onDateChange, cover }: PropsType) {
    const { title, imageUrl, weddingDate } = cover;

    return (
        <Jumbotron>
            <h1>Cover</h1>

            <Form onSubmit={onSubmit} loading={loading} saving={saving}>
                <TextField
                    name="title"
                    floatingLabelText="Title"
                    value={title}
                    onChange={onChange}
                    required
                    fullWidth
                />

                <TextField
                    name="imageUrl"
                    type="url"
                    floatingLabelText="Cover Image Url"
                    value={imageUrl}
                    onChange={onChange}
                    required
                    fullWidth
                />

                <DatePicker
                    name="weddingDate"
                    hintText="Wedding Date"
                    value={weddingDate}
                    onChange={onDateChange}
                    required
                    fullWidth
                />

                <RaisedButton type="submit" label="Update" primary disabled={saving} />
            </Form>
        </Jumbotron>
    );
}
