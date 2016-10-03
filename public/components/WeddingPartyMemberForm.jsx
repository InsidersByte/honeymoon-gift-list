/* @flow */

import React from 'react';
import { Paper, Toolbar, ToolbarGroup, ToolbarTitle, TextField, RaisedButton } from 'material-ui';
import ProgressButton from './ProgressButton';
import Form from './Form';
import { WEDDING_PARTY_MEMBERS_ROUTE } from '../constants/routes';

type PropsType = {
    member: {
        name: string,
        title: string,
        imageUrl: string,
        description: string,
    },
    title: string,
    loading: boolean,
    saving: boolean,
    onChange: Function,
    onSubmit: Function,
    onBack: Function,
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

export default function WeddingPartyMemberForm({ member, title, loading, saving, onChange, onSubmit, onBack }: PropsType) {
    return (
        <Paper>
            <Toolbar>
                <ToolbarGroup>
                    <ToolbarTitle text={`${title} Wedding Party Member`} />
                </ToolbarGroup>
            </Toolbar>

            <Form onSubmit={onSubmit} loading={loading} saving={saving} style={styles.form}>
                <TextField
                    name="name"
                    floatingLabelText="Name"
                    value={member.name}
                    onChange={onChange}
                    fullWidth
                    style={styles.input}
                    disabled={saving}
                    required
                />

                <TextField
                    name="title"
                    floatingLabelText="Title"
                    value={member.title}
                    onChange={onChange}
                    fullWidth
                    style={styles.input}
                    disabled={saving}
                    required
                />

                <TextField
                    name="imageUrl"
                    type="url"
                    floatingLabelText="Image Url"
                    value={member.imageUrl}
                    onChange={onChange}
                    fullWidth
                    style={styles.input}
                    disabled={saving}
                    required
                />

                <TextField
                    name="description"
                    rows={10}
                    multiLine
                    floatingLabelText="Description"
                    value={member.description}
                    onChange={onChange}
                    fullWidth
                    style={styles.input}
                    disabled={saving}
                    required
                />

                <ProgressButton saving={saving} label={title} style={styles.button} />
                <RaisedButton label="Back" onClick={onBack} disabled={saving} style={styles.button} />
            </Form>
        </Paper>
    );
}

