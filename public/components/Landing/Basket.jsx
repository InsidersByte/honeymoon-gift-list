import React from 'react';
import { Link } from 'react-router';
import FontAwesome from '../FontAwesome';
import { BASKET_ROUTE } from '../../constants/routes';

import css from './Basket.styl';

export default class Basket extends React.Component {
    static propTypes = {
        basketCount: React.PropTypes.number.isRequired,
        total: React.PropTypes.number.isRequired,
    };

    render() {
        if (this.props.basketCount <= 0) {
            return null;
        }

        return (
            <section className={css.root}>
                <div>
                    <FontAwesome icon="shopping-basket" />
                </div>

                <div>
                    {this.props.basketCount} item(s)
                </div>

                <div>
                    £{this.props.total}
                </div>

                <Link to={BASKET_ROUTE} className="btn btn-success btn-sm">
                    Basket
                </Link>
            </section>
        );
    }
}
