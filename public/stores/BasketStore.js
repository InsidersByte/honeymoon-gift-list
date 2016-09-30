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
        const { id } = item;

        const existingItem = this.items.get(id) || { quantity: 0 };
        const updatedItem = Object.assign(existingItem, item);
        updatedItem.quantity += 1;

        if (updatedItem.quantity > updatedItem.remaining) {
            updatedItem.quantity = updatedItem.remaining;
        }

        this.items.set(id, updatedItem);
    }

    removeFromBasket({ id }) {
        const item = this.items.get(id);

        if (item.quantity <= 1) {
            return;
        }

        item.quantity -= 1;
    }

    deleteFromBasket({ id }) {
        this.items.delete(id);
    }

    emptyBasket() {
        this.items.clear();
    }
}

export default alt.createStore(BasketStore, 'BasketStore');
