import React from 'react';
import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

export default function ProfileForm(props) {
    return (
        <div>
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
        </div>
    );
}

ProfileForm.propTypes = {
    user: React.PropTypes.object.isRequired,
    onChange: React.PropTypes.func.isRequired,
};
