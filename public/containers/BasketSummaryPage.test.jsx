import React from 'react';
import { shallow } from 'enzyme';
import { BasketSummaryPage } from './BasketSummaryPage';

const basket = new Map();
basket.set(1, { id: 1, price: 1, quantity: 1, remaining: 10 });
basket.set(2, { id: 2, price: 2, quantity: 2, remaining: 20 });

const addToBasket = jest.fn();
const removeFromBasket = jest.fn();
const deleteFromBasket = jest.fn();

const props = {
    basket,
    basketCount: 3,
    basketTotal: 5,
    actions: {
        addToBasket,
        removeFromBasket,
        deleteFromBasket,
    },
};

describe('BasketSummaryPage', () => {
    it('should render correctly', () => {
        const wrapper = shallow(<BasketSummaryPage {...props} />);

        expect(wrapper).toMatchSnapshot();
    });

    it('should have no state', () => {
        const wrapper = shallow(<BasketSummaryPage />);

        expect(wrapper.state()).toBe(null);
    });

    it('should render a <BasketSummary /> component', () => {
        const wrapper = shallow(<BasketSummaryPage />);

        expect(wrapper.find('BasketSummary').length).toBe(1);
    });

    it('should set <BasketSummary /> props', () => {
        const wrapper = shallow(<BasketSummaryPage {...props} />);

        const basketSummary = wrapper.find('BasketSummary');

        expect(basketSummary.prop('basket')).toBe(props.basket);
        expect(basketSummary.prop('basketCount')).toBe(props.basketCount);
        expect(basketSummary.prop('basketTotal')).toBe(props.basketTotal);
        expect(basketSummary.prop('addToBasket')).toBeInstanceOf(Function);
        expect(basketSummary.prop('removeFromBasket')).toBeInstanceOf(Function);
        expect(basketSummary.prop('deleteFromBasket')).toBeInstanceOf(Function);
    });

    it('should call addToBasket and pass the item when addToBasket is called', () => {
        const wrapper = shallow(<BasketSummaryPage {...props} />);
        const item = { id: 1 };

        expect(addToBasket).not.toHaveBeenCalled();

        wrapper.instance().addToBasket(item);

        expect(addToBasket).toHaveBeenCalledTimes(1);
        expect(addToBasket).toHaveBeenCalledWith(item);
    });

    it('should call removeFromBasket and pass the item when removeFromBasket is called', () => {
        const wrapper = shallow(<BasketSummaryPage {...props} />);
        const item = { id: 1 };

        expect(removeFromBasket).not.toHaveBeenCalled();

        wrapper.instance().removeFromBasket(item);

        expect(removeFromBasket).toHaveBeenCalledTimes(1);
        expect(removeFromBasket).toHaveBeenCalledWith(item);
    });

    it('should call deleteFromBasket and pass the item when deleteFromBasket is called', () => {
        const wrapper = shallow(<BasketSummaryPage {...props} />);
        const item = { id: 1 };

        expect(deleteFromBasket).not.toHaveBeenCalled();

        wrapper.instance().deleteFromBasket(item);

        expect(deleteFromBasket).toHaveBeenCalledTimes(1);
        expect(deleteFromBasket).toHaveBeenCalledWith(item);
    });
});
