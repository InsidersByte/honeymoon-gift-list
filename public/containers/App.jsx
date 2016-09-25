import React from 'react';
import NotificationSystem from 'react-notification-system';
import connect from 'alt-utils/lib/connectToStores';
import NotificationStore from '../stores/NotificationStore';

const styles = {
    root: {
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    container: {
        flex: 1,
        display: 'flex',
        margin: '0',
    },
};

@connect
export default class App extends React.Component {
    static propTypes = {
        children: React.PropTypes.element.isRequired,
        notification: React.PropTypes.shape({}).isRequired,
    };

    static getStores = () => [NotificationStore];
    static getPropsFromStores = () => NotificationStore.getState();

    componentWillReceiveProps({ notification }) {
        if (!notification || notification === this.props.notification) {
            return;
        }

        this.notificationSystem.addNotification(notification);
    }

    render() {
        return (
            <div style={styles.root}>
                <div style={styles.container}>
                    {this.props.children}
                </div>

                <NotificationSystem ref={(c) => { this.notificationSystem = c; }} />
            </div>
        );
    }
}
