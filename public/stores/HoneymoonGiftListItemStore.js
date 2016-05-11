import alt from '../helpers/alt';
import actions from '../actions/HoneymoonGiftListItemActions';
import BaseStore from './BaseStore';
import { HONEYMOON_GIFT_LIST_ITEM as key } from '../constants/KeyConstants';
import random from '../../lib/random';
import { MAXIMUM_NUMBER } from '../constants/sorting';

const initialValue = {
    imageUrl: '',
    name: '',
    description: '',
    requested: '',
    price: '',
};

class HoneymoonGiftListItemStore extends BaseStore {
    constructor() {
        super({ actions, key, initialValue });
    }

    move({ sourceId, targetId }) {
        const items = [...this.items];
        const sourceIndex = items.findIndex(o => o._id === sourceId); // eslint-disable-line no-underscore-dangle
        const targetIndex = items.findIndex(o => o._id === targetId); // eslint-disable-line no-underscore-dangle
        const movingUp = sourceIndex > targetIndex;
        let nextTargetPosition;

        const item = { ...items[sourceIndex] };
        const { position: targetMemberPosition } = items[targetIndex];

        if (targetIndex === 0) {
            nextTargetPosition = 0;
        } else if (targetIndex === items.length - 1) {
            nextTargetPosition = targetMemberPosition + MAXIMUM_NUMBER;
        } else {
            const nextTargetMemberIndex = movingUp ? targetIndex - 1 : targetIndex + 1;
            nextTargetPosition = items[nextTargetMemberIndex].position;
        }

        let newPosition;

        if (movingUp) {
            newPosition = random.integer(nextTargetPosition + 1, targetMemberPosition - 1);
        } else {
            newPosition = random.integer(targetMemberPosition + 1, nextTargetPosition - 1);
        }

        item.position = newPosition;

        items.splice(sourceIndex, 1);
        items.splice(targetIndex, 0, item);

        this.items = items;
    }
}

export default alt.createStore(HoneymoonGiftListItemStore, 'HoneymoonGiftListItemStore');
