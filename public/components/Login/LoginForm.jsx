import React from 'react';
import { FormGroup, ControlLabel, FormControl, InputGroup, Button } from 'react-bootstrap';

function LoginForm(props) {
    return (
        <form onSubmit={props.onSubmit}>
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
                        <Button bsStyle="link" onClick={props.onForgot} style={{ borderColor: '#ccc' }}>Forgot?</Button>
                    </InputGroup.Button>
                </InputGroup>
            </FormGroup>

            <Button type="submit" bsStyle="primary" block>Login</Button>
        </form>
    );
}

LoginForm.propTypes = {
    user: React.PropTypes.object.isRequired,
    onChange: React.PropTypes.func.isRequired,
    onSubmit: React.PropTypes.func.isRequired,
    onForgot: React.PropTypes.func.isRequired,
};

export default LoginForm;
