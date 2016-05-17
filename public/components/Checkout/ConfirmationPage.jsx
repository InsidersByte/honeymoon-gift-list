import React from 'react';
import { Link } from 'react-router';
import GiftActions from '../../actions/GiftActions';
import GiftStore from '../../stores/GiftStore';
import { HOME_ROUTE } from '../../constants/routeConstants';
import css from './ConfirmationPage.styl';

export default class ConfirmationPage extends React.Component {
    static propTypes = {
        params: React.PropTypes.shape({
            giftSetId: React.PropTypes.string.isRequired,
        }).isRequired,
    };

    state = GiftStore.getState();

    componentDidMount() {
        GiftStore.listen(this.onStoreChange);
        const { giftSetId } = this.props.params;
        GiftActions.fetch.defer(giftSetId);
    }

    componentWillUnmount() {
        GiftStore.unlisten(this.onStoreChange);
    }

    onStoreChange = state => {
        this.setState(state);
    };

    render() {
        return (
            <section className={css.root}>
                <h1 className={css.title}>Thank you very much for your gift!</h1>

                <div className={css.content}>
                    <p>You will receive an email with your gift confirmation.</p>
                </div>

                <Link to={HOME_ROUTE} className="btn btn-success" role="button">Back to Home</Link>
            </section>
        );
    }
}
