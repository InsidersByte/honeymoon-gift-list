/* @flow */

import React from 'react';
import connect from 'alt-utils/lib/connectToStores';
import CoverForm from '../components/CoverForm';
import CoverActions from '../actions/CoverActions';
import CoverStore from '../stores/CoverStore';

type PropsType = {
    loading: boolean,
    saving: boolean,
    cover: {
        title: string,
        imageUrl: string,
        weddingDate: Date,
    },
};

function cleanCover(cover) {
    if (!cover || !cover.weddingDate) {
        return cover;
    }

    const weddingDate = new Date(cover.weddingDate);
    return Object.assign({}, cover, { weddingDate });
}

@connect
export default class CoverPage extends React.Component {
    static getStores = () => [CoverStore];
    static getPropsFromStores = () => {
        const storeState = CoverStore.getState();
        const cover = cleanCover(storeState.cover);
        return Object.assign({}, storeState, { cover });
    };

    props: PropsType;

    state = { cover: this.props.cover };

    componentDidMount() {
        CoverActions.fetch();
    }

    componentWillReceiveProps({ cover }: PropsType) {
        this.setState({ cover });
    }

    onChange = ({ target: { name, value } }: { target: { name: string, value: string } }) => {
        const cover = Object.assign(this.state.cover, { [name]: value });
        this.setState({ cover });
    };

    onDateChange = (event: SyntheticEvent, date: Date) => {
        const cover = Object.assign({}, this.state.cover, { weddingDate: date });
        this.setState({ cover });
    };

    submit = (event: SyntheticEvent) => {
        event.preventDefault();
        CoverActions.update(this.state);
    };

    render() {
        const { loading, saving } = this.props;
        const { cover } = this.state;

        return (
            <CoverForm
                cover={cover}
                onChange={this.onChange}
                onDateChange={this.onDateChange}
                onSubmit={this.submit}
                loading={loading}
                saving={saving}
            />
        );
    }
}
