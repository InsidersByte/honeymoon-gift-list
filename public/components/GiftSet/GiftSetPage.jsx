import React from 'react';
import { Jumbotron, FormGroup, ControlLabel, FormControl, Col, Row, ButtonToolbar, Button } from 'react-bootstrap';
import { Link } from 'react-router';
import moment from 'moment';
import GiftSetActions from '../../actions/GiftSetActions';
import GiftSetStore from '../../stores/GiftSetStore';
import GiftTable from './GiftTable';
import { GIFT_SETS_ROUTE } from '../../constants/routeConstants';
import Loader from '../common/Loader';

export default class GiftSetPage extends React.Component {
    static propTypes = {
        params: React.PropTypes.shape({
            giftSetId: React.PropTypes.string.isRequired,
        }).isRequired,
    };

    static defaultProps = {
        params: {},
    };

    static contextTypes = {
        router: React.PropTypes.object.isRequired,
    };

    state = GiftSetStore.getState();

    componentDidMount() {
        GiftSetStore.listen(this.onStoreChange);
        const { giftSetId } = this.props.params;
        GiftSetActions.fetch(giftSetId);
    }

    componentWillUnmount() {
        GiftSetStore.unlisten(this.onStoreChange);
    }

    onStoreChange = (state) => {
        if (this.state.removing && !state.removing) {
            this.context.router.push(GIFT_SETS_ROUTE);
            return;
        }

        this.setState(state);
    };

    markAsDetailsSent = () => {
        if (!confirm('Are you sure you want to mark this gift set as details sent?')) {
            return;
        }

        const { giftSetId: id } = this.props.params;
        GiftSetActions.detailsSent({ ...this.state, id });
    };

    markAsPaid = () => {
        if (!confirm('Are you sure you want to mark this gift as paid?')) {
            return;
        }

        const { giftSetId: id } = this.props.params;
        GiftSetActions.paid({ ...this.state, id });
    };

    delete = () => {
        if (!confirm('Are you sure you want to delete this gift set?')) {
            return;
        }

        const { giftSetId: _id } = this.props.params;
        GiftSetActions.remove({ _id });
    };

    render() {
        const fullName = `${this.state.giftSet.giver.forename} ${this.state.giftSet.giver.surname}`;
        const createdAt = moment(this.state.giftSet.createdAt);
        const createdAtFormatted = createdAt.format('DD/MM/YY HH:MM');

        return (
            <Jumbotron>
                <h1>Gift Set</h1>

                <Loader loading={this.state.loading}>
                    <Row>
                        <Col md={4}>
                            <FormGroup>
                                <ControlLabel>Full Name</ControlLabel>
                                <FormControl.Static>
                                    {fullName}
                                </FormControl.Static>
                            </FormGroup>

                            <FormGroup>
                                <ControlLabel>Email Address</ControlLabel>
                                <FormControl.Static>
                                    {this.state.giftSet.giver.email}
                                </FormControl.Static>
                            </FormGroup>
                        </Col>

                        <Col md={4}>
                            <FormGroup>
                                <ControlLabel>Phone Number</ControlLabel>
                                <FormControl.Static>
                                    {this.state.giftSet.giver.phoneNumber}
                                </FormControl.Static>
                            </FormGroup>

                            <FormGroup>
                                <ControlLabel>Gift Date</ControlLabel>
                                <FormControl.Static>
                                    {createdAtFormatted}
                                </FormControl.Static>
                            </FormGroup>
                        </Col>

                        <Col md={4}>
                            <FormGroup>
                                <ControlLabel>Gift Total (£)</ControlLabel>
                                <FormControl.Static>
                                    {this.state.giftSet.total}
                                </FormControl.Static>
                            </FormGroup>

                            <FormGroup>
                                <ControlLabel>Paid</ControlLabel>
                                <FormControl.Static>
                                    {this.state.giftSet.paid ? 'Yes' : 'No'}
                                </FormControl.Static>
                            </FormGroup>
                        </Col>
                    </Row>

                    <h3>Gifts</h3>

                    <GiftTable gifts={this.state.giftSet.gifts} />

                    <ButtonToolbar>
                        <Link to={GIFT_SETS_ROUTE} className="btn btn-primary" role="button">Back to Gift Sets</Link>

                        <Button
                            onClick={this.markAsDetailsSent}
                            bsStyle="success"
                            disabled={this.state.giftSet.detailsSent || this.state.giftSet.paid}
                        >
                            {
                                this.state.giftSet.detailsSent || this.state.giftSet.paid ?
                                    'Already Marked as Details Sent or Paid' :
                                    'Mark as Details Sent'
                            }
                        </Button>

                        <Button
                            onClick={this.markAsPaid}
                            bsStyle="success"
                            disabled={this.state.giftSet.paid}
                        >
                            {this.state.giftSet.paid ? 'Already Marked as Paid' : 'Mark as Paid'}
                        </Button>

                        <Button onClick={this.delete} bsStyle="danger" disabled={this.state.giftSet.paid}>Delete</Button>
                    </ButtonToolbar>
                </Loader>
            </Jumbotron>
        );
    }
}
