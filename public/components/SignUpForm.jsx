import React, { PropTypes } from 'react';
import { Jumbotron, FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';
import Form from './common/Form';

export default function SignUpForm({ user, saving, loading, onChange, onSubmit }) {
    const { username, name, password, confirmPassword } = user;

    return (
        <Jumbotron>
            <h1>Create your account</h1>

            <Form onSubmit={onSubmit} loading={loading} saving={saving}>
                <FormGroup>
                    <ControlLabel>Username</ControlLabel>
                    <FormControl.Static>
                        {username}
                    </FormControl.Static>
                </FormGroup>

                <FormGroup>
                    <ControlLabel>Name</ControlLabel>
                    <FormControl
                        name="name"
                        type="text"
                        placeholder="Enter name"
                        value={name}
                        onChange={onChange}
                        required
                    />
                </FormGroup>

                <FormGroup>
                    <ControlLabel>Password</ControlLabel>
                    <FormControl
                        name="password"
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={onChange}
                        required
                    />
                </FormGroup>

                <FormGroup>
                    <ControlLabel>Confirm Password</ControlLabel>
                    <FormControl
                        name="confirmPassword"
                        type="password"
                        placeholder="Enter confirm password"
                        value={confirmPassword}
                        onChange={onChange}
                        required
                    />
                </FormGroup>

                <Button type="submit" bsStyle="primary" block>Create Account</Button>
            </Form>
        </Jumbotron>
    );
}

SignUpForm.propTypes = {
    user: PropTypes.shape({
        username: PropTypes.string.isRequired, // eslint-disable-line react/no-unused-prop-types
        name: PropTypes.string.isRequired, // eslint-disable-line react/no-unused-prop-types
        password: PropTypes.string.isRequired, // eslint-disable-line react/no-unused-prop-types
        confirmPassword: PropTypes.string.isRequired, // eslint-disable-line react/no-unused-prop-types
    }).isRequired,
    saving: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
};
