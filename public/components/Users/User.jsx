import React from 'react';
import { Button, Modal, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

class User extends React.Component {
    handleSubmit = (event) => {
        event.preventDefault();
        this.props.onSubmit(this.props.user);
    };

    render() {
        return (
            <Modal show={this.props.show} onHide={this.props.onHide}>
                <form onSubmit={this.handleSubmit}>
                    <Modal.Header closeButton>
                        <Modal.Title>Create User</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <FormGroup>
                            <ControlLabel>Name</ControlLabel>
                            <FormControl
                                name="name"
                                type="text"
                                placeholder="Enter name"
                                value={this.props.user.name}
                                onChange={this.props.onChange}
                                required
                            />
                        </FormGroup>

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

                        <FormGroup>
                            <ControlLabel>Password</ControlLabel>
                            <FormControl
                                name="password"
                                type="password"
                                placeholder="Enter password"
                                value={this.props.user.password}
                                onChange={this.props.onChange}
                                required
                            />
                        </FormGroup>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button bsStyle="primary" type="submit">Save</Button>
                        <Button onClick={this.props.onHide}>Close</Button>
                    </Modal.Footer>
                </form>
            </Modal>
        );
    }
}

User.propTypes = {
    user: React.PropTypes.object.isRequired,
    show: React.PropTypes.bool.isRequired,
    onHide: React.PropTypes.func.isRequired,
    onSubmit: React.PropTypes.func.isRequired,
    onChange: React.PropTypes.func.isRequired,
};

export default User;
