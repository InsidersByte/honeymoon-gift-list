/* @flow */

import React from 'react';
import connect from 'alt-utils/lib/connectToStores';
import HoneymoonGiftListActions from '../actions/HoneymoonGiftListActions';
import HoneymoonGiftListStore from '../stores/HoneymoonGiftListStore';
import HoneymoonGiftListForm from '../components/HoneymoonGiftListForm';

type PropsType = {
    loading: boolean,
    saving: boolean,
    honeymoonGiftList: {
        content: string,
        showPaymentMessage: boolean,
        showDisclaimerMessage: boolean,
        paymentMessage: string,
        disclaimerMessage: string,
    },
};

@connect
export default class HoneymoonGiftListPage extends React.Component {
    static getStores = () => [HoneymoonGiftListStore];
    static getPropsFromStores = () => HoneymoonGiftListStore.getState();

    props: PropsType;

    state = {
        honeymoonGiftList: this.props.honeymoonGiftList,
        open: false,
    };

    componentDidMount() {
        HoneymoonGiftListActions.fetch();
    }

    componentWillReceiveProps({ honeymoonGiftList }: PropsType) {
        this.setState({ honeymoonGiftList });
    }

    onChange = ({ target: { name, value } }: { target: { name: string, value: string } }) => {
        const honeymoonGiftList = Object.assign({}, this.state.honeymoonGiftList, { [name]: value });
        this.setState({ honeymoonGiftList });
    };

    onContentChange = ({ target: { value } }: { target: { value: string } }) => {
        const honeymoonGiftList = Object.assign({}, this.state.honeymoonGiftList, { content: value });
        this.setState({ honeymoonGiftList });
    };

    onCheck = ({ target: { name } }: { target: { name: string } }, checked: boolean) => {
        const honeymoonGiftList = Object.assign({}, this.state.honeymoonGiftList, { [name]: checked });
        this.setState({ honeymoonGiftList });
    };

    onSubmit = (event: SyntheticEvent) => {
        event.preventDefault();
        HoneymoonGiftListActions.update(this.state);
    };

    handleOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    render() {
        const { loading, saving } = this.props;
        const { honeymoonGiftList, open } = this.state;

        return (
            <HoneymoonGiftListForm
                honeymoonGiftList={honeymoonGiftList}
                onChange={this.onChange}
                onCheck={this.onCheck}
                onContentChange={this.onContentChange}
                onSubmit={this.onSubmit}
                loading={loading}
                saving={saving}
                open={open}
                handleOpen={this.handleOpen}
                handleClose={this.handleClose}
            />
        );
    }
}
