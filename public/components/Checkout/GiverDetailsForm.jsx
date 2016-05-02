import React from 'react';
import { FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';
import { Link } from 'react-router';
import { BASKET_ROUTE } from '../../constants/routeConstants';
import Form from '../common/Form';
import css from './GiverDetailsForm.styl';

export default function GiverDetailsForm(props) {
    return (
        <Form onSubmit={props.onSubmit} loading={false} saving={props.isSaving}>
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

            <div className={css.actions}>
                <Button
                    type="submit"
                    bsStyle="success"
                >
                    {props.isSaving ? 'Completing Gift...' : 'Complete Gift'}
                </Button>

                <Link
                    to={BASKET_ROUTE}
                    className="btn btn-default"
                    role="button"
                >
                    Back to Basket
                </Link>
            </div>
        </Form>
    );
}

GiverDetailsForm.propTypes = {
    giver: React.PropTypes.object.isRequired,
    isSaving: React.PropTypes.bool.isRequired,
    onChange: React.PropTypes.func.isRequired,
    onSubmit: React.PropTypes.func.isRequired,
};
