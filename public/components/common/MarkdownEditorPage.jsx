import React from 'react';
import { Jumbotron, Button } from 'react-bootstrap';
import MarkdownEditor from '@insidersbyte/react-markdown-editor';
import '@insidersbyte/react-markdown-editor/dist/css/react-markdown-editor.css';
import Form from '../common/Form';

export default class MarkdownEditorPage extends React.Component {
    static propTypes = {
        propKey: React.PropTypes.string.isRequired,
        title: React.PropTypes.string.isRequired,
        store: React.PropTypes.shape({
            getState: React.PropTypes.func.isRequired,
            listen: React.PropTypes.func.isRequired,
            unlisten: React.PropTypes.func.isRequired,
        }).isRequired,
        actions: React.PropTypes.shape({
            fetch: React.PropTypes.func.isRequired,
            update: React.PropTypes.func.isRequired,
        }).isRequired,
    };

    state = this.props.store.getState();

    componentDidMount() {
        this.props.store.listen(this.onStoreChange);
        this.props.actions.fetch();
    }

    componentWillUnmount() {
        this.props.store.unlisten(this.onStoreChange);
    }

    onStoreChange = (state) => {
        this.setState(state);
    };

    onChange = (event) => {
        this.setState({ [this.props.propKey]: event.target.value });
    };

    submit = (event) => {
        event.preventDefault();
        this.props.actions.update(this.state);
    };

    render() {
        return (
            <Jumbotron>
                <h1>{this.props.title}</h1>

                <Form onSubmit={this.submit} loading={this.state.loading} saving={this.state.saving}>
                    <MarkdownEditor value={this.state[this.props.propKey]} onChange={this.onChange} />

                    <Button type="submit" bsStyle="primary" block>Update</Button>
                </Form>
            </Jumbotron>
        );
    }
}
