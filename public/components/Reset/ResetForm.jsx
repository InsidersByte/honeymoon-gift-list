import React from 'react';
import { Input, Button } from 'react-bootstrap';

function ResetForm(props) {
    return (
        <form onSubmit={props.onSubmit}>
            <Input
                name="password"
                type="password"
                label="Password"
                placeholder="Enter password"
                value={props.user.password}
                onChange={props.onChange}
                required
            />

            <Input
                name="confirmPassword"
                type="password"
                label="Confirm Password"
                placeholder="Enter confirm password"
                value={props.user.confirmPassword}
                onChange={props.onChange}
                required
            />

            <Button type="submit" bsStyle="primary" block>Reset Password</Button>
        </form>
    );
}

ResetForm.propTypes = {
    user: React.PropTypes.object.isRequired,
    onChange: React.PropTypes.func.isRequired,
    onSubmit: React.PropTypes.func.isRequired,
};

export default ResetForm;
