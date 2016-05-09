import React from 'react';
import { FormGroup, ControlLabel, FormControl, InputGroup, Button } from 'react-bootstrap';
import css from './LoginForm.styl';
import Form from '../common/Form';

export default function LoginForm(props) {
    return (
        <Form onSubmit={props.onSubmit} loading={false} saving={props.saving}>
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
                <InputGroup>
                    <FormControl
                        name="password"
                        type="password"
                        placeholder="Enter password"
                        value={props.user.password}
                        onChange={props.onChange}
                        required
                    />
                    <InputGroup.Button>
                        <Button className={css.forgottenLink} bsStyle="link" onClick={props.onForgot}>Forgot?</Button>
                    </InputGroup.Button>
                </InputGroup>
            </FormGroup>

            <Button type="submit" bsStyle="primary" block>Login</Button>
        </Form>
    );
}

LoginForm.propTypes = {
    user: React.PropTypes.shape({
        username: React.PropTypes.string.isRequired,
        password: React.PropTypes.string.isRequired,
    }).isRequired,
    onChange: React.PropTypes.func.isRequired,
    onForgot: React.PropTypes.func.isRequired,
    onSubmit: React.PropTypes.func.isRequired,
    saving: React.PropTypes.bool.isRequired,
};
