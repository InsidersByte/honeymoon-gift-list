import React from 'react';
import NotificationSystem from 'react-notification-system';
import NotificationStore from '../stores/NotificationStore';
import { ToastContainer, ToastMessage } from 'react-toastr';
import css from './App.styl';

const ToastMessageFactory = React.createFactory(ToastMessage.animation);
let notificationSystem;

export default class App extends React.Component {
    static propTypes = {
        children: React.PropTypes.element.isRequired,
    };

    componentDidMount() {
        NotificationStore.listen(this.onStoreChange);
        notificationSystem = this.refs.notificationSystem;
    }

    componentWillUnmount() {
        NotificationStore.unlisten(this.onStoreChange);
    }

    onStoreChange() {
        const { notification } = NotificationStore.getState();
        notificationSystem.addNotification(notification);
    }

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
            <div className={css.root}>
                <div className={css.container}>
                    {this.props.children && React.cloneElement(this.props.children, {
                        toastSuccess: this.toastSuccess,
                        toastError: this.toastError,
                    })}
                </div>

                <NotificationSystem ref="notificationSystem" />

                <ToastContainer
                    ref="container"
                    toastMessageFactory={ToastMessageFactory}
                    className="toast-bottom-left"
                />
            </div>
        );
    }
}
