import React from 'react';
import { Jumbotron, Button } from 'react-bootstrap';
import MarkdownEditor from '@insidersbyte/react-markdown-editor';
import Loader from '../common/Loader';

export default class MarkdownEditorPage extends React.Component {
    static propTypes = {
        propKey: React.PropTypes.string.isRequired,
        title: React.PropTypes.string.isRequired,
        store: React.PropTypes.object.isRequired,
        actions: React.PropTypes.object.isRequired,
    };

    state = this.props.store.getState();

    componentDidMount() {
        this.props.store.listen(this.onStoreChange);
        this.props.actions.fetch();
    }

    componentWillUnmount() {
        this.props.store.unlisten(this.onStoreChange);
    }

    onStoreChange = state => {
        this.setState(state);
    };

    onChange = event => {
        this.setState({ [this.props.propKey]: event.target.value });
    };

    submit = event => {
        event.preventDefault();
        this.props.actions.update(this.state);
    };

    render() {
        return (
            <Jumbotron>
                <h1>{this.props.title}</h1>

                <Loader loading={this.state.loading}>
                    <form onSubmit={this.submit}>
                        <MarkdownEditor value={this.state[this.props.propKey]} onChange={this.onChange} />

                        <Button type="submit" bsStyle="primary" block disabled={this.state.saving}>Update</Button>
                    </form>
                </Loader>
            </Jumbotron>
        );
    }
}
