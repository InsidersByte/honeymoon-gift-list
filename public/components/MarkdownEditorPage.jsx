/* @flow */

import React from 'react';
import { Paper, Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui';
import MarkdownEditor from '@insidersbyte/react-markdown-editor';
import '@insidersbyte/react-markdown-editor/dist/css/react-markdown-editor.css';
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

    state = this.props.store.getState();

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

    submit = (event: SyntheticEvent) => {
        event.preventDefault();
        this.props.actions.update(this.state);
    };

    render() {
        const { title, propKey } = this.props;
        const { loading, saving, [propKey]: value } = this.state;

        return (
            <Paper>
                <Toolbar>
                    <ToolbarGroup>
                        <ToolbarTitle text={title} />
                    </ToolbarGroup>
                </Toolbar>

                <Form onSubmit={this.submit} loading={loading} saving={saving} style={styles.form}>
                    <MarkdownEditor value={value} onChange={this.onChange} />

                    <ProgressButton saving={saving} label="Update" style={styles.button} />
                </Form>
            </Paper>
        );
    }
}
