import React from 'react';
import HoneymoonGiftListApi from '../../api/honeymoonGiftList.api';
import { Jumbotron } from 'react-bootstrap';
import HoneymoonGiftListForm from './HoneymoonGiftListForm';

export default class HoneymoonGiftListPage extends React.Component {
    static propTypes = {
        toastSuccess: React.PropTypes.func,
        toastError: React.PropTypes.func,
    };

    state = {
        honeymoonGiftList: {
            content: '',
            showOfflinePaymentMessage: false,
            showDisclaimerMessage: false,
            offlinePaymentMessage: '',
            disclaimerMessage: '',
        },
    };

    componentDidMount() {
        HoneymoonGiftListApi
            .get()
            .then((response) => {
                this.setState({
                    honeymoonGiftList: response,
                });
            })
            .catch((error) => {
                this.props.toastError('There was an error loading the honeymoonGiftList data', error);
            });
    }

    setHoneymoonGiftListState = (event) => {
        const field = event.target.name;
        let value = event.target.value;

        if (event.target.checked !== undefined) {
            value = event.target.checked;
        }

        this.state.honeymoonGiftList[field] = value;
        return this.setState({ honeymoonGiftList: this.state.honeymoonGiftList });
    };

    submit = (event) => {
        event.preventDefault();

        HoneymoonGiftListApi
            .put(this.state.honeymoonGiftList)
            .then(() => {
                this.props.toastSuccess('HoneymoonGiftList updated');
            })
            .catch((error) => {
                this.props.toastError('There was an error saving honeymoonGiftList', error);
            });
    };

    render() {
        return (
            <div>
                <Jumbotron>
                    <h1>Honeymoon Gift List</h1>

                    <HoneymoonGiftListForm
                        honeymoonGiftList={this.state.honeymoonGiftList}
                        onChange={this.setHoneymoonGiftListState}
                        onSubmit={this.submit}
                    />
                </Jumbotron>
            </div>
        );
    }
}
