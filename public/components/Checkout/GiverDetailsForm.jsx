import React from 'react';
import { FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';
import { Link } from 'react-router';
import { BASKET_ROUTE } from '../../constants/routeConstants';

function GiverDetailsForm(props) {
    return (
        <form onSubmit={props.onSubmit}>
            <div className="giver-details__content">
                <FormGroup>
                    <ControlLabel>Forename</ControlLabel>
                    <FormControl
                        name="forename"
                        type="text"
                        placeholder="Enter your forename"
                        value={props.giver.forename}
                        onChange={props.onChange}
                        required
                    />
                </FormGroup>

                <FormGroup>
                    <ControlLabel>Surname</ControlLabel>
                    <FormControl
                        name="surname"
                        type="text"
                        placeholder="Enter your surname"
                        value={props.giver.surname}
                        onChange={props.onChange}
                        required
                    />
                </FormGroup>

                <FormGroup>
                    <ControlLabel>Email</ControlLabel>
                    <FormControl
                        name="email"
                        type="email"
                        placeholder="Enter your email address"
                        value={props.giver.email}
                        onChange={props.onChange}
                        required
                    />
                </FormGroup>

                <FormGroup>
                    <ControlLabel>Telephone Number</ControlLabel>
                    <FormControl
                        name="phoneNumber"
                        type="text"
                        placeholder="Enter your telephone number"
                        value={props.giver.phoneNumber}
                        onChange={props.onChange}
                        required
                    />
                </FormGroup>
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
                    to={BASKET_ROUTE}
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
