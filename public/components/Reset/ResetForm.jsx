import React from 'react';
import { FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';

export default function ResetForm(props) {
    return (
        <form onSubmit={props.onSubmit}>
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

            <Button type="submit" bsStyle="primary" block>Reset Password</Button>
        </form>
    );
}

ResetForm.propTypes = {
    user: React.PropTypes.object.isRequired,
    onChange: React.PropTypes.func.isRequired,
    onSubmit: React.PropTypes.func.isRequired,
};
