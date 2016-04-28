import React from 'react';
import { Jumbotron } from 'react-bootstrap';
import GiftSetTable from './GiftSetTable';
import GiftSetApi from '../../api/GiftSetApi';
import { giftSetRoute } from '../../constants/routeConstants';

export default class GiftSetsPage extends React.Component {
    static propTypes = {
        toastSuccess: React.PropTypes.func,
        toastError: React.PropTypes.func,
    };

    static contextTypes = {
        router: React.PropTypes.object.isRequired,
    };

    state = {
        giftSets: [],
    };

    componentDidMount() {
        this.loadGiftSets();
    }

    markAsPaid = (giftSet) => {
        // TODO: Use a confirmation model instead of confirm
        if (!confirm('Are you sure you want to mark this gift set as paid?')) {
            return;
        }

        GiftSetApi
            .paid(giftSet, giftSet._id) // eslint-disable-line no-underscore-dangle
            .then(() => {
                this.loadGiftSets();
                this.props.toastSuccess('Gift set marked as paid');
            })
            .catch((error) => {
                this.props.toastError('There was an error marking a gift set as paid', error);
            });
    };

    markAsDetailsSent = (giftSet) => {
        // TODO: Use a confirmation model instead of confirm
        if (!confirm('Are you sure you want to mark this gift set as details sent?')) {
            return;
        }

        GiftSetApi
            .detailsSent(giftSet, giftSet._id) // eslint-disable-line no-underscore-dangle
            .then(() => {
                this.loadGiftSets();
                this.props.toastSuccess('Gift set marked as details sent');
            })
            .catch((error) => {
                this.props.toastError('There was an error marking a gift set as details sent', error);
            });
    };

    delete = (giftSet) => {
        // TODO: Use a confirmation model instead of confirm
        if (!confirm('Are you sure you want to delete this gift set?')) {
            return;
        }

        GiftSetApi
            .delete(giftSet._id) // eslint-disable-line no-underscore-dangle
            .then(() => {
                this.loadGiftSets();
                this.props.toastSuccess('Gift set deleted');
            })
            .catch((error) => {
                this.props.toastError('There was an error deleting a gift set', error);
            });
    };

    view = (giftSet) => {
        this.context.router.push(giftSetRoute(giftSet._id)); // eslint-disable-line no-underscore-dangle
    };

    loadGiftSets() {
        GiftSetApi
            .get()
            .then((response) => {
                this.setState({
                    giftSets: response,
                });
            })
            .catch((error) => {
                this.props.toastError('There was an error loading the gift sets', error);
            });
    }

    render() {
        return (
            <Jumbotron>
                <h1>Gift Sets</h1>

                <GiftSetTable
                    giftSets={this.state.giftSets}
                    onMarkAsPaid={this.markAsPaid}
                    onMarkAsDetailsSent={this.markAsDetailsSent}
                    onDelete={this.delete}
                    onSelect={this.view}
                />
            </Jumbotron>
        );
    }
}
