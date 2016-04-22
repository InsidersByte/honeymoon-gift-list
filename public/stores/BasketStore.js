import alt from '../helpers/alt';
import basketActions from '../actions/BasketActions';

class BasketStore {
    constructor() {
        this.on('afterEach', this.setCountAndTotal);
        this.bindActions(basketActions);

        this.items = {};
        this.basketCount = 0;
        this.total = 0;
    }

    setCountAndTotal() {
        let basketCount = 0;
        let total = 0;

        for (const key in this.items) { // eslint-disable-line no-restricted-syntax
            if (this.items.hasOwnProperty(key)) {
                const { quantity, price } = this.items[key];
                basketCount += quantity;
                total += price * quantity;
            }
        }

        this.setState({
            basketCount,
            total,
        });
    }

    addToBasket(item) {
        const existingItem = this.items[item._id] || { quantity: 0 }; // eslint-disable-line no-underscore-dangle
        existingItem.quantity += 1;
        const updatedItem = Object.assign({}, existingItem, item);

        if (updatedItem.quantity > updatedItem.remaining) {
            updatedItem.quantity = updatedItem.remaining;
        }

        this.items[item._id] = updatedItem; // eslint-disable-line no-underscore-dangle
    }

    removeFromBasket({ _id }) {
        if (this.items[_id].quantity <= 1) { // eslint-disable-line no-underscore-dangle
            return;
        }

        this.items[_id].quantity -= 1; // eslint-disable-line no-underscore-dangle
    }

    deleteFromBasket({ _id }) {
        delete this.items[_id]; // eslint-disable-line no-underscore-dangle
    }

    emptyBasket() {
        this.items = {};
    }
}

export default alt.createStore(BasketStore, 'BasketStore');
