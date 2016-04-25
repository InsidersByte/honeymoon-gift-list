import React from 'react';
import { ToastContainer, ToastMessage } from 'react-toastr';

const ToastMessageFactory = React.createFactory(ToastMessage.animation);

export default class App extends React.Component {
    static propTypes = {
        children: React.PropTypes.element.isRequired,
    };

    toastSuccess = (message) => {
        this
            .refs
            .container
            .success(
                message,
                'Success',
                { closeButton: true }
            );
    };

    toastError = (message, error) => {
        if (error) {
            console.error(error);
        }

        this
            .refs
            .container
            .error(
                message,
                'Error',
                { closeButton: true }
            );
    };

    render() {
        return (
            <div className="maximum-size">
                <div className="maximum-size">
                    {this.props.children && React.cloneElement(this.props.children, {
                        toastSuccess: this.toastSuccess,
                        toastError: this.toastError,
                    })}
                </div>

                <ToastContainer
                    ref="container"
                    toastMessageFactory={ToastMessageFactory}
                    className="toast-bottom-left"
                />
            </div>
        );
    }
}
