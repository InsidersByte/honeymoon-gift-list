import React from 'react';
import { FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';
import Form from '../Form';

export default function SetupForm(props) {
    return (
        <Form onSubmit={props.onSubmit} loading={false} saving={props.saving}>
            <FormGroup>
                <ControlLabel>Name</ControlLabel>
                <FormControl
                    name="name"
                    type="text"
                    placeholder="Enter name"
                    value={props.user.name}
                    onChange={props.onChange}
                    required
                />
            </FormGroup>

            <FormGroup>
                <ControlLabel>Username</ControlLabel>
                <FormControl
                    name="username"
                    type="email"
                    placeholder="Enter username"
                    value={props.user.username}
                    onChange={props.onChange}
                    required
                />
            </FormGroup>

            <FormGroup>
                <ControlLabel>Password</ControlLabel>
                <FormControl
                    name="password"
                    type="password"
                    placeholder="Enter password"
                    value={props.user.password}
                    onChange={props.onChange}
                    required
                />
            </FormGroup>

            <FormGroup>
                <ControlLabel>Confirm Password</ControlLabel>
                <FormControl
                    name="confirmPassword"
                    type="password"
                    placeholder="Enter confirm password"
                    value={props.user.confirmPassword}
                    onChange={props.onChange}
                    required
                />
            </FormGroup>

            <Button type="submit" bsStyle="primary" block>Setup</Button>
        </Form>
    );
}

SetupForm.propTypes = {
    user: React.PropTypes.shape({
        name: React.PropTypes.string.isRequired,
        username: React.PropTypes.string.isRequired,
        password: React.PropTypes.string.isRequired,
        confirmPassword: React.PropTypes.string.isRequired,
    }).isRequired,
    onChange: React.PropTypes.func.isRequired,
    onSubmit: React.PropTypes.func.isRequired,
    saving: React.PropTypes.bool.isRequired,
};
