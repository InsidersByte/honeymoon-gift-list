import React from 'react';
import { Jumbotron } from 'react-bootstrap';
import WeddingPartyMemberForm from './WeddingPartyMemberForm';
import WeddingPartyMemberActions from '../../actions/WeddingPartyMemberActions';
import WeddingPartyMemberStore from '../../stores/WeddingPartyMemberStore';

export default class UpdateWeddingPartyMemberPage extends React.Component {
    static propTypes = {
        params: React.PropTypes.object.isRequired,
    };

    static defaultProps = {
        params: {},
    };

    state = WeddingPartyMemberStore.getState();

    componentDidMount() {
        const { id } = this.props.params;

        WeddingPartyMemberStore.listen(this.onStoreChange);
        WeddingPartyMemberActions.fetch(id);
    }

    componentWillUnmount() {
        WeddingPartyMemberStore.unlisten(this.onStoreChange);
    }

    onStoreChange = state => {
        this.setState(state);
    };

    onChange = ({ target: { name, value } }) => {
        const member = Object.assign(this.state.member, { [name]: value });
        this.setState({ member });
    };

    onSubmit = (event) => {
        event.preventDefault();

        const { id } = this.props.params;

        WeddingPartyMemberActions.update({ ...this.state, id });
    };

    render() {
        return (
            <Jumbotron>
                <h1>Update Wedding Party Member</h1>

                <WeddingPartyMemberForm member={this.state.member} title="Update" onChange={this.onChange} onSubmit={this.onSubmit} />
            </Jumbotron>
        );
    }
}

