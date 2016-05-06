import React from 'react';
import { FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';
import Form from '../common/Form';

export default function ProfileForm(props) {
    return (
        <Form onSubmit={props.onSubmit} loading={false} saving={props.saving}>
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
        </Form>
    );
}

ProfileForm.propTypes = {
    user: React.PropTypes.shape({
        currentPassword: React.PropTypes.string.isRequired,
        newPassword: React.PropTypes.string.isRequired,
        confirmPassword: React.PropTypes.string.isRequired,
    }).isRequired,
    onChange: React.PropTypes.func.isRequired,
    onSubmit: React.PropTypes.func.isRequired,
    saving: React.PropTypes.bool.isRequired,
};
