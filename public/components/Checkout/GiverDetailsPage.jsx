import React from 'react';
import GiverDetailsForm from './GiverDetailsForm';
import GiftActions from '../../actions/GiftActions';
import GiftStore from '../../stores/GiftStore';
import basketStore from '../../stores/BasketStore';
import { HOME_ROUTE } from '../../constants/routes';

import css from './GiverDetailsPage.styl';

export default class GiverDetailsPage extends React.Component {
    static contextTypes = {
        router: React.PropTypes.object.isRequired,
    };

    state = {
        giver: {
            forename: '',
            surname: '',
            email: '',
            phoneNumber: '',
            paymentMethod: '',
        },
        saving: false,
    };

    componentWillMount() {
        const { basketCount } = basketStore.getState();

        if (basketCount <= 0) {
            this.context.router.replace(HOME_ROUTE);
        }
    }

    componentDidMount() {
        GiftStore.listen(this.onStoreChange);
    }

    componentWillUnmount() {
        GiftStore.unlisten(this.onStoreChange);
    }

    onStoreChange = (state) => {
        this.setState(state);
    };

    onChange = (event) => {
        const field = event.target.name;
        const value = event.target.value;
        this.state.giver[field] = value;
        return this.setState({ giver: this.state.giver });
    };

    submit = (event) => {
        event.preventDefault();

        const { items } = basketStore.getState();

        GiftActions.create({
            giver: this.state.giver,
            items: [...items.values()],
        });
    };

    render() {
        return (
            <section className={css.root}>
                <div className={css.container}>
                    <h1 className={css.title}>Your Details</h1>

                    <GiverDetailsForm
                        giver={this.state.giver}
                        isSaving={this.state.saving}
                        onChange={this.onChange}
                        onSubmit={this.submit}
                    />
                </div>
            </section>
        );
    }
}
