import React from 'react';
import { Button, Modal, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import Form from '../Form';

export default class User extends React.Component {
    static propTypes = {
        user: React.PropTypes.shape({
            username: React.PropTypes.string.isRequired,
        }).isRequired,
        show: React.PropTypes.bool.isRequired,
        onHide: React.PropTypes.func.isRequired,
        onChange: React.PropTypes.func.isRequired,
        onSubmit: React.PropTypes.func.isRequired,
        saving: React.PropTypes.bool.isRequired,
    };

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.onSubmit(this.props.user);
    };

    render() {
        return (
            <Modal show={this.props.show} onHide={this.props.onHide}>
                <Form onSubmit={this.handleSubmit} loading={false} saving={this.props.saving}>
                    <Modal.Header closeButton>
                        <Modal.Title>Create User</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <FormGroup>
                            <ControlLabel>Username</ControlLabel>
                            <FormControl
                                name="username"
                                type="email"
                                placeholder="Enter username"
                                value={this.props.user.username}
                                onChange={this.props.onChange}
                                required
                            />
                        </FormGroup>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button bsStyle="primary" type="submit">Send Invitation Now</Button>
                        <Button onClick={this.props.onHide}>Close</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        );
    }
}
