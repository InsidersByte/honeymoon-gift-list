import React from 'react';
import { FormGroup, ControlLabel, FormControl, InputGroup, Button } from 'react-bootstrap';
import css from './LoginForm.styl';

export default function LoginForm(props) {
    return (
        <div>
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
        </div>
    );
}

LoginForm.propTypes = {
    user: React.PropTypes.object.isRequired,
    onChange: React.PropTypes.func.isRequired,
    onForgot: React.PropTypes.func.isRequired,
};
