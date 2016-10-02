/* @flow */

import React from 'react';
import { Paper, Toolbar, ToolbarGroup, ToolbarTitle, TextField, Checkbox, IconButton, DatePicker } from 'material-ui';
import InfoOutline from 'material-ui/svg-icons/action/info-outline';
import MarkdownEditor from '@insidersbyte/react-markdown-editor';
import '@insidersbyte/react-markdown-editor/dist/css/react-markdown-editor.css';
import MarkdownHelp from './MarkdownHelp';
import ProgressButton from './ProgressButton';
import Form from './Form';

type PropsType = {
    weddingProfile: {
        coverTitle: string,
        coverImageUrl: string,
        weddingDate: Date,
        giftListContent: string,
        showPaymentMessage: boolean,
        paymentMessage: string,
        showDisclaimerMessage: boolean,
        disclaimerMessage: string,
    },
    loading: boolean,
    saving: boolean,
    open: boolean,
    onChange: Function,
    onDateChange: Function,
    onContentChange: Function,
    onCheck: Function,
    onSubmit: Function,
    handleOpen: Function,
    handleClose: Function,
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

const DateTimeFormat = global.Intl.DateTimeFormat;

export default function WeddingProfileForm(
    { weddingProfile, loading, saving, onChange, onDateChange, onContentChange, onCheck, onSubmit, open, handleOpen, handleClose }: PropsType
) {
    const {
        coverTitle, coverImageUrl, weddingDate, giftListContent, showPaymentMessage, paymentMessage, showDisclaimerMessage,
        disclaimerMessage,
    } = weddingProfile;

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
        <div>
            <Paper>
                <Toolbar>
                    <ToolbarGroup>
                        <ToolbarTitle text="Wedding Profile" />
                    </ToolbarGroup>
                    <ToolbarGroup>
                        <IconButton touch tooltip="Help" onClick={handleOpen}>
                            <InfoOutline />
                        </IconButton>
                    </ToolbarGroup>
                </Toolbar>

                <Form onSubmit={onSubmit} loading={loading} saving={saving} style={styles.form}>
                    <TextField
                        name="coverTitle"
                        floatingLabelText="Cover Title"
                        value={coverTitle}
                        onChange={onChange}
                        fullWidth
                        style={styles.input}
                        disabled={saving}
                        required
                    />

                    <TextField
                        name="coverImageUrl"
                        type="url"
                        floatingLabelText="Cover Image Url"
                        value={coverImageUrl}
                        onChange={onChange}
                        fullWidth
                        style={styles.input}
                        disabled={saving}
                        required
                    />

                    <DatePicker
                        name="weddingDate"
                        floatingLabelText="Wedding Date"
                        DateTimeFormat={DateTimeFormat}
                        locale="en-GB"
                        value={weddingDate}
                        onChange={onDateChange}
                        fullWidth
                        style={styles.input}
                        disabled={saving}
                        required
                    />

                    <MarkdownEditor
                        name="giftListContent"
                        value={giftListContent}
                        onChange={onContentChange}
                        disabled={saving}
                    />

                    <Checkbox
                        name="showPaymentMessage"
                        label="Show Payment Message"
                        checked={showPaymentMessage}
                        onCheck={onCheck}
                        disabled={saving}
                        style={styles.checkbox}
                    />

                    {paymentMessageInput}

                    <Checkbox
                        name="showDisclaimerMessage"
                        label="Show Disclaimer Message"
                        checked={showDisclaimerMessage}
                        onCheck={onCheck}
                        disabled={saving}
                        style={styles.checkbox}
                    />

                    {disclaimerMessageInput}

                    <ProgressButton saving={saving} label="Update" style={styles.button} />
                </Form>
            </Paper>

            <MarkdownHelp open={open} handleClose={handleClose} />
        </div>
    );
}
