import React from 'react';
import { Jumbotron } from 'react-bootstrap';
import CoverForm from './CoverForm';
import moment from 'moment';
import CoverActions from '../../actions/CoverActions';
import CoverStore from '../../stores/CoverStore';
import Loader from '../common/Loader';

export default class CoverPage extends React.Component {
    state = CoverStore.getState();

    componentDidMount() {
        CoverStore.listen(this.onStoreChange);
        CoverActions.fetch();
    }

    componentWillUnmount() {
        CoverStore.unlisten(this.onStoreChange);
    }

    onStoreChange = state => {
        const newState = Object.assign({}, state);

        if (newState.cover && newState.cover.weddingDate) {
            const weddingDate = moment(newState.cover.weddingDate);
            newState.cover.weddingDate = weddingDate.format('YYYY-MM-DD');
        }

        this.setState(newState);
    };

    onChange = ({ target: { name, value } }) => {
        const cover = Object.assign(this.state.cover, { [name]: value });
        this.setState({ cover });
    };

    submit = (event) => {
        event.preventDefault();
        CoverActions.update(this.state);
    };

    render() {
        return (
            <Jumbotron>
                <h1>Cover</h1>

                <Loader loading={this.state.loading}>
                    <CoverForm cover={this.state.cover} onChange={this.onChange} onSubmit={this.submit} />
                </Loader>
            </Jumbotron>
        );
    }
}
