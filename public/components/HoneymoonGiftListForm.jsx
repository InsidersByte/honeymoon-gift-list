/* @flow */

import React from 'react';
import { Paper, Toolbar, ToolbarGroup, ToolbarTitle, TextField, Checkbox } from 'material-ui';
import MarkdownEditor from '@insidersbyte/react-markdown-editor';
import '@insidersbyte/react-markdown-editor/dist/css/react-markdown-editor.css';
import ProgressButton from './ProgressButton';
import Form from './Form';

type PropsType = {
    honeymoonGiftList: {
        content: string,
        showPaymentMessage: boolean,
        showDisclaimerMessage: boolean,
        paymentMessage: string,
        disclaimerMessage: string,
    },
    loading: boolean,
    saving: boolean,
    onChange: Function,
    onContentChange: Function,
    onCheck: Function,
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
        marginBottom: -6,
    },
    button: {
        marginTop: 12,
    },
};

export default function HoneymoonGiftListForm({ honeymoonGiftList, loading, saving, onChange, onContentChange, onCheck, onSubmit }: PropsType) {
    const { content, showPaymentMessage, showDisclaimerMessage, paymentMessage, disclaimerMessage } = honeymoonGiftList;

    let paymentMessageInput = null;
    let disclaimerMessageInput = null;

    if (showPaymentMessage === true) {
        paymentMessageInput = (
            <TextField
                name="paymentMessage"
                floatingLabelText="Payment Message"
                value={paymentMessage}
                onChange={onChange}
                multiLine
                fullWidth
                style={styles.input}
                disabled={saving}
                required
            />
        );
    }

    if (showDisclaimerMessage === true) {
        disclaimerMessageInput = (
            <TextField
                name="disclaimerMessage"
                floatingLabelText="Disclaimer Message"
                value={disclaimerMessage}
                onChange={onChange}
                multiLine
                fullWidth
                style={styles.input}
                disabled={saving}
                required
            />
        );
    }

    return (
        <Paper>
            <Toolbar>
                <ToolbarGroup>
                    <ToolbarTitle text="Honeymoon Gift List" />
                </ToolbarGroup>
            </Toolbar>

            <Form onSubmit={onSubmit} loading={loading} saving={saving} style={styles.form}>
                <MarkdownEditor
                    name="content"
                    value={content}
                    onChange={onContentChange}
                />

                <Checkbox
                    name="showPaymentMessage"
                    label="Show Payment Message"
                    checked={showPaymentMessage}
                    onCheck={onCheck}
                    style={styles.checkbox}
                />

                {paymentMessageInput}

                <Checkbox
                    name="showDisclaimerMessage"
                    label="Show Disclaimer Message"
                    checked={showDisclaimerMessage}
                    onCheck={onCheck}
                    style={styles.checkbox}
                />

                {disclaimerMessageInput}

                <ProgressButton saving={saving} label="Update" style={styles.button} />
            </Form>
        </Paper>
    );
}
