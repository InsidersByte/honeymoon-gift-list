import React from 'react';
import { Jumbotron } from 'react-bootstrap';
import HoneymoonGiftListActions from '../../actions/HoneymoonGiftListActions';
import HoneymoonGiftListStore from '../../stores/HoneymoonGiftListStore';
import HoneymoonGiftListForm from './HoneymoonGiftListForm';
import Loader from '../common/Loader';

export default class HoneymoonGiftListPage extends React.Component {
    state = HoneymoonGiftListStore.getState();

    componentDidMount() {
        HoneymoonGiftListStore.listen(this.onStoreChange);
        HoneymoonGiftListActions.fetch();
    }

    componentWillUnmount() {
        HoneymoonGiftListStore.unlisten(this.onStoreChange);
    }

    onStoreChange = state => {
        this.setState(state);
    };

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
        HoneymoonGiftListActions.update(this.state);
    };

    render() {
        return (
            <div>
                <Jumbotron>
                    <h1>Honeymoon Gift List</h1>

                    <Loader loading={this.state.loading}>
                        <HoneymoonGiftListForm
                            honeymoonGiftList={this.state.honeymoonGiftList}
                            onChange={this.setHoneymoonGiftListState}
                            onSubmit={this.submit}
                        />
                    </Loader>
                </Jumbotron>
            </div>
        );
    }
}
