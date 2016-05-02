import React from 'react';
import Loader from './Loader';

export default function Form(props) {
    return (
        <Loader loading={props.loading}>
            <form onSubmit={props.onSubmit}>
                <fieldset disabled={props.saving}>
                    {props.children}
                </fieldset>
            </form>
        </Loader>
    );
}

Form.propTypes = {
    onSubmit: React.PropTypes.func.isRequired,
    saving: React.PropTypes.bool.isRequired,
    loading: React.PropTypes.bool.isRequired,
    children: React.PropTypes.oneOfType([
        React.PropTypes.element,
        React.PropTypes.arrayOf(React.PropTypes.element),
    ]).isRequired,
};
