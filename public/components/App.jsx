import React from 'react';
import NotificationSystem from 'react-notification-system';
import NotificationStore from '../stores/NotificationStore';
import css from './App.styl';

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

    render() {
        return (
            <div className={css.root}>
                <div className={css.container}>
                    {this.props.children}
                </div>

                <NotificationSystem ref="notificationSystem" />
            </div>
        );
    }
}
