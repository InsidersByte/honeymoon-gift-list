/* @flow */

import React from 'react';
import { Paper, Toolbar, ToolbarGroup, ToolbarTitle, IconButton } from 'material-ui';
import MarkdownEditor from '@insidersbyte/react-markdown-editor';
import '@insidersbyte/react-markdown-editor/dist/css/react-markdown-editor.css';
import InfoOutline from 'material-ui/svg-icons/action/info-outline';
import MarkdownHelp from './MarkdownHelp';
import Form from './Form';
import ProgressButton from './ProgressButton';

type PropsType = {
    propKey: string,
    title: string,
    store: Object,
    actions: Object,
};

const styles = {
    form: {
        padding: '30px 50px',
        marginBottom: 10,
    },
    button: {
        marginTop: 12,
    },
};

export default class MarkdownEditorPage extends React.Component {
    props: PropsType;

    state = {
        ...this.props.store.getState(),
        open: false,
    };

    componentDidMount() {
        this.props.store.listen(this.onStoreChange);
        this.props.actions.fetch();
    }

    componentWillUnmount() {
        this.props.store.unlisten(this.onStoreChange);
    }

    onStoreChange = (state: Object) => {
        this.setState(state);
    };

    onChange = ({ target: { value } }: { target: { value: string } }) => {
        this.setState({ [this.props.propKey]: value });
    };

    open = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    submit = (event: SyntheticEvent) => {
        event.preventDefault();
        this.props.actions.update(this.state);
    };

    render() {
        const { title, propKey } = this.props;
        const { loading, saving, [propKey]: value, open } = this.state;

        return (
            <div>
                <Paper>
                    <Toolbar>
                        <ToolbarGroup>
                            <ToolbarTitle text={title} />
                        </ToolbarGroup>
                        <ToolbarGroup>
                            <IconButton touch tooltip="Help" onClick={this.open}>
                                <InfoOutline />
                            </IconButton>
                        </ToolbarGroup>
                    </Toolbar>

                    <Form onSubmit={this.submit} loading={loading} saving={saving} style={styles.form}>
                        <MarkdownEditor value={value} onChange={this.onChange} />

                        <ProgressButton saving={saving} label="Update" style={styles.button} />
                    </Form>
                </Paper>

                <MarkdownHelp open={open} handleClose={this.handleClose} />
            </div>
        );
    }
}
