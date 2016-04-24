import alt from '../helpers/alt';
import basketActions from '../actions/BasketActions';

class BasketStore {
    constructor() {
        this.on('afterEach', this.setCountAndTotal);
        this.bindActions(basketActions);

        this.items = new Map();
        this.basketCount = 0;
        this.total = 0;
    }

    setCountAndTotal() {
        let basketCount = 0;
        let total = 0;

        for (const item of this.items.values()) {
            const { quantity, price } = item;
            basketCount += quantity;
            total += price * quantity;
        }

        this.setState({
            basketCount,
            total,
        });
    }

    addToBasket(item) {
        const { _id } = item; // eslint-disable-line no-underscore-dangle

        const existingItem = this.items.get(_id) || { quantity: 0 };
        const updatedItem = Object.assign(existingItem, item);
        updatedItem.quantity += 1;

        if (updatedItem.quantity > updatedItem.remaining) {
            updatedItem.quantity = updatedItem.remaining;
        }

        this.items.set(_id, updatedItem);
    }

    removeFromBasket({ _id }) {
        const item = this.items.get(_id);

        if (item.quantity <= 1) {
            return;
        }

        item.quantity -= 1;
        this.items.set(_id, item);
    }

    deleteFromBasket({ _id }) {
        this.items.delete(_id);
    }

    emptyBasket() {
        this.items.clear();
    }
}

export default alt.createStore(BasketStore, 'BasketStore');
