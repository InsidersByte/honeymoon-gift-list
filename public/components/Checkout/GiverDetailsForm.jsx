import React from 'react';
import { Input, Button } from 'react-bootstrap';
import { Link } from 'react-router';

function GiverDetailsForm(props) {
    return (
        <form onSubmit={props.onSubmit}>
            <div className="giver-details__content">
                <Input
                    name="forename"
                    type="text"
                    label="Forename"
                    placeholder="Enter your forename"
                    value={props.giver.forename}
                    onChange={props.onChange}
                    required
                />

                <Input
                    name="surname"
                    type="text"
                    label="Surname"
                    placeholder="Enter your surname"
                    value={props.giver.surname}
                    onChange={props.onChange}
                    required
                />

                <Input
                    name="email"
                    type="email"
                    label="Email"
                    placeholder="Enter your email address"
                    value={props.giver.email}
                    onChange={props.onChange}
                    required
                />

                <Input
                    name="phoneNumber"
                    type="text"
                    label="Telephone Number"
                    placeholder="Enter your telephone number"
                    value={props.giver.phoneNumber}
                    onChange={props.onChange}
                    required
                />
            </div>

            <div className="giver-details__actions">
                <Button
                    type="submit"
                    bsStyle="success"
                    disabled={props.isSaving}
                >
                    {props.isSaving ? 'Completing Gift...' : 'Complete Gift'}
                </Button>

                <Link
                    to="/basket"
                    className="btn btn-default"
                    role="button"
                    disabled={props.isSaving}
                >
                    Back to Basket
                </Link>
            </div>
        </form>
    );
}

GiverDetailsForm.propTypes = {
    giver: React.PropTypes.object.isRequired,
    isSaving: React.PropTypes.bool.isRequired,
    onChange: React.PropTypes.func.isRequired,
    onSubmit: React.PropTypes.func.isRequired,
};

export default GiverDetailsForm;
