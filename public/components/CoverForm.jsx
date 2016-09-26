/* @flow */

import React from 'react';
import { Paper, Toolbar, ToolbarGroup, ToolbarTitle, DatePicker, TextField } from 'material-ui';
import ProgressButton from './ProgressButton';
import Form from './Form';

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

const DateTimeFormat = global.Intl.DateTimeFormat;

export default function CoverForm({ loading, saving, onSubmit, onChange, onDateChange, cover }: PropsType) {
    const { title, imageUrl, weddingDate } = cover;

    return (
        <Paper>
            <Toolbar>
                <ToolbarGroup>
                    <ToolbarTitle text="Cover" />
                </ToolbarGroup>
            </Toolbar>

            <Form onSubmit={onSubmit} loading={loading} saving={saving} style={styles.form}>
                <TextField
                    name="title"
                    floatingLabelText="Title"
                    value={title}
                    onChange={onChange}
                    fullWidth
                    style={styles.input}
                    disabled={saving}
                    required
                />

                <TextField
                    name="imageUrl"
                    type="url"
                    floatingLabelText="Cover Image Url"
                    value={imageUrl}
                    onChange={onChange}
                    fullWidth
                    style={styles.input}
                    disabled={saving}
                    required
                />

                <DatePicker
                    name="weddingDate"
                    hintText="Wedding Date"
                    DateTimeFormat={DateTimeFormat}
                    locale="en-GB"
                    value={weddingDate}
                    onChange={onDateChange}
                    fullWidth
                    style={styles.input}
                    disabled={saving}
                    required
                />

                <ProgressButton saving={saving} label="Update" style={styles.button} />
            </Form>
        </Paper>
    );
}
