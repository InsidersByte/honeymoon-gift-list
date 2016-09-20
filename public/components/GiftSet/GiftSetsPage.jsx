import React from 'react';
import { Jumbotron } from 'react-bootstrap';
import GiftSetTable from './GiftSetTable';
import GiftSetActions from '../../actions/GiftSetActions';
import GiftSetStore from '../../stores/GiftSetStore';
import { giftSetRoute } from '../../constants/routeConstants';
import Loader from '../common/Loader';

export default class GiftSetsPage extends React.Component {
    static contextTypes = {
        router: React.PropTypes.object.isRequired,
    };

    state = GiftSetStore.getState();

    componentDidMount() {
        GiftSetStore.listen(this.onStoreChange);
        GiftSetActions.query.defer();
    }

    componentWillUnmount() {
        GiftSetStore.unlisten(this.onStoreChange);
    }

    onStoreChange = (state) => {
        if (this.state.removing && !state.removing) {
            GiftSetActions.query.defer();
        }

        if (this.state.saving && !state.saving) {
            GiftSetActions.query.defer();
        }

        this.setState(state);
    };

    markAsDetailsSent = (giftSet) => {
        if (!confirm('Are you sure you want to mark this gift set as details sent?')) {
            return;
        }

        const { _id: id } = giftSet;
        GiftSetActions.detailsSent({ giftSet, id });
    };

    markAsPaid = (giftSet) => {
        if (!confirm('Are you sure you want to mark this gift set as paid?')) {
            return;
        }

        const { _id: id } = giftSet;
        GiftSetActions.paid({ giftSet, id });
    };

    delete = (giftSet) => {
        if (!confirm('Are you sure you want to delete this gift set?')) {
            return;
        }

        GiftSetActions.remove(giftSet);
    };

    view = (giftSet) => {
        this.context.router.push(giftSetRoute(giftSet._id)); // eslint-disable-line no-underscore-dangle
    };

    render() {
        const { loading, giftSets } = this.state;

        const totalGiftSets = giftSets.length;
        const giftSetsTotal = giftSets.reduce((a, b) => a + b.total, 0);

        return (
            <Jumbotron>
                <div style={{ display: 'inline-block' }}>
                    <h1 style={{ display: 'inline-block' }}>Gift Sets</h1>
                    &nbsp;({totalGiftSets} Gift Sets totalling £{giftSetsTotal})
                </div>

                <Loader loading={loading}>
                    <GiftSetTable
                        giftSets={giftSets}
                        onMarkAsPaid={this.markAsPaid}
                        onMarkAsDetailsSent={this.markAsDetailsSent}
                        onDelete={this.delete}
                        onSelect={this.view}
                    />
                </Loader>
            </Jumbotron>
        );
    }
}
