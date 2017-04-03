/* @flow */

import React from 'react';
import { Link } from 'react-router';
import { Paper, Toolbar, ToolbarGroup, ToolbarTitle, TextField, Checkbox, IconButton, RaisedButton } from 'material-ui';
import InfoOutline from 'material-ui/svg-icons/action/info-outline';
import MarkdownEditor from '@insidersbyte/react-markdown-editor';
import '@insidersbyte/react-markdown-editor/dist/css/react-markdown-editor.css';
import { SECTIONS_ROUTE } from '../constants/routes';
import MarkdownHelp from './MarkdownHelp';
import ProgressButton from './ProgressButton';
import Form from './Form';

type PropsType = {
  section: {
    title: string,
    content: string,
    hidden: boolean,
  },
  loading: boolean,
  saving: boolean,
  type: 'Create' | 'Update',
  open: boolean,
  onChange: Function,
  onCheck: Function,
  onContentChange: Function,
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
  },
  button: {
    marginTop: 12,
    marginRight: 12,
  },
};

export default function SectionForm(
  {
    section,
    loading,
    saving,
    type,
    onChange,
    onContentChange,
    onCheck,
    onSubmit,
    open,
    handleOpen,
    handleClose,
  }: PropsType
) {
  const { title, content, hidden } = section;

  return (
    <div>
      <Paper>
        <Toolbar>
          <ToolbarGroup>
            <ToolbarTitle text={`${type} Section`} />
          </ToolbarGroup>

          <ToolbarGroup>
            <IconButton touch tooltip="Help" onClick={handleOpen}>
              <InfoOutline />
            </IconButton>
          </ToolbarGroup>
        </Toolbar>

        <Form onSubmit={onSubmit} loading={loading} saving={saving} style={styles.form}>
          <TextField name="title" floatingLabelText="Title" value={title} onChange={onChange} fullWidth style={styles.input} disabled={saving} required />

          <MarkdownEditor name="content" value={content} onChange={onContentChange} disabled={saving} />

          <Checkbox name="hidden" label="Hidden" checked={hidden} onCheck={onCheck} disabled={saving} style={styles.checkbox} />

          <ProgressButton saving={saving} label={type} style={styles.button} />

          <RaisedButton label="Back" containerElement={<Link to={SECTIONS_ROUTE}>Back</Link>} linkButton style={styles.button} />
        </Form>
      </Paper>

      <MarkdownHelp open={open} handleClose={handleClose} />
    </div>
  );
}
