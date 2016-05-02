import React from 'react';
import { Button, ButtonToolbar } from 'react-bootstrap';
import { Link } from 'react-router';
import Loader from './Loader';

export default function Form(props) {
    let buttons;

    if (!props.routeBack) {
        buttons = <Button type="submit" bsStyle="primary" block disabled={props.saving}>Update</Button>;
    } else {
        buttons = (
            <ButtonToolbar>
                <Button type="submit" bsStyle="primary">{props.saveButtonText}</Button>
                <Link className="btn btn-default" to={props.routeBack}>Back</Link>
            </ButtonToolbar>
        );
    }

    return (
        <Loader loading={props.loading}>
            <form onSubmit={props.onSubmit}>
                <fieldset disabled={props.saving}>
                    {props.children}

                    {buttons}
                </fieldset>
            </form>
        </Loader>
    );
}

Form.propTypes = {
    onSubmit: React.PropTypes.func.isRequired,
    saving: React.PropTypes.bool.isRequired,
    loading: React.PropTypes.bool.isRequired,
    routeBack: React.PropTypes.string,
    saveButtonText: React.PropTypes.string,
    children: React.PropTypes.oneOfType([
        React.PropTypes.element,
        React.PropTypes.arrayOf(React.PropTypes.element),
    ]).isRequired,
};

Form.defaultProps = {
    saveButtonText: 'Update',
};
