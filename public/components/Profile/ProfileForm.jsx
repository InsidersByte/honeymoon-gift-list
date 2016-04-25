import React from 'react';
import { FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';

export default function ProfileForm(props) {
    return (
        <form onSubmit={props.onSubmit}>
            <FormGroup>
                <ControlLabel>Current Password</ControlLabel>
                <FormControl
                    name="currentPassword"
                    type="password"
                    value={props.user.currentPassword}
                    onChange={props.onChange}
                    required
                />
            </FormGroup>

            <FormGroup>
                <ControlLabel>New Password</ControlLabel>
                <FormControl
                    name="newPassword"
                    type="password"
                    value={props.user.newPassword}
                    onChange={props.onChange}
                    required
                />
            </FormGroup>

            <FormGroup>
                <ControlLabel>Confirm Password</ControlLabel>
                <FormControl
                    name="confirmPassword"
                    type="password"
                    value={props.user.confirmPassword}
                    onChange={props.onChange}
                    required
                />
            </FormGroup>

            <Button type="submit" bsStyle="primary" block>Change Password</Button>
        </form>
    );
}

ProfileForm.propTypes = {
    user: React.PropTypes.object.isRequired,
    onChange: React.PropTypes.func.isRequired,
    onSubmit: React.PropTypes.func.isRequired,
};
