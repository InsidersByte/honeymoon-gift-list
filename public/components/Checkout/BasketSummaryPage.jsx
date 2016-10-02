import React from 'react';
import { Link } from 'react-router';
import basketActions from '../../actions/BasketActions';
import basketStore from '../../stores/BasketStore';
import BasketSummaryTable from './BasketSummaryTable';
import { GIVER_ROUTE, HOME_ROUTE } from '../../constants/routes';

import css from './BasketSummaryPage.styl';

export default class BasketSummaryPage extends React.Component {
    state = basketStore.getState();

    componentDidMount() {
        basketStore.listen(this.onStoreChange);
    }

    componentWillUnmount() {
        basketStore.unlisten(this.onStoreChange);
    }

    onStoreChange = (state) => {
        this.setState(state);
    };

    addToBasket = (item) => {
        basketActions.addToBasket(item);
    };

    removeFromBasket = (item) => {
        basketActions.removeFromBasket(item);
    };

    deleteFromBasket = (item) => {
        basketActions.deleteFromBasket(item);
    };

    render() {
        let content;

        if (this.state.basketCount > 0) {
            content = (
                <div className={css.container}>
                    <h1 className={css.title}>
                        Subtotal ({this.state.basketCount} items): £{this.state.total}
                    </h1>

                    <div className={css.content}>
                        <BasketSummaryTable
                            items={this.state.items}
                            total={this.state.total}
                            onAdd={this.addToBasket}
                            onRemove={this.removeFromBasket}
                            onDelete={this.deleteFromBasket}
                        />
                    </div>

                    <div className={css.actions}>
                        <Link to={GIVER_ROUTE} className="btn btn-success" role="button">Proceed to Checkout</Link>

                        <Link
                            to={HOME_ROUTE}
                            className="btn btn-default"
                            role="button"
                        >
                            Back to Home
                        </Link>
                    </div>
                </div>
            );
        } else {
            content = (
                <div className={css.container}>
                    <h1 className={css.title}>
                        Your Basket is empty!
                    </h1>

                    <div className={css.actions}>
                        <Link
                            to={HOME_ROUTE}
                            className="btn btn-success"
                            role="button"
                        >
                            Back to Home
                        </Link>
                    </div>
                </div>
            );
        }

        return (
            <section className={css.root}>
                {content}
            </section>
        );
    }
}
