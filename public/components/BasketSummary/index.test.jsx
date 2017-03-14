import React from 'react';
import { shallow } from 'enzyme';
import BasketSummary from './';

const item1 = { id: 1, price: 1, quantity: 1, remaining: 10 };
const item2 = { id: 2, price: 2, quantity: 2, remaining: 20 };

const basket = new Map();
basket.set(1, item1);
basket.set(2, item2);

const addToBasket = jest.fn();
const removeFromBasket = jest.fn();
const deleteFromBasket = jest.fn();

const props = {
    basket,
    basketCount: 3,
    basketTotal: 5,
    addToBasket,
    removeFromBasket,
    deleteFromBasket,
};

describe('BasketSummary', () => {
    afterEach(() => {
        expect(addToBasket).not.toHaveBeenCalled();
        expect(removeFromBasket).not.toHaveBeenCalled();
        expect(deleteFromBasket).not.toHaveBeenCalled();
    });

    it('should render correctly', () => {
        const wrapper = shallow(
            <BasketSummary {...props} />,
        );

        expect(wrapper).toMatchSnapshot();
    });

    it('should singularise items if there is only one item in the basket', () => {
        const wrapper = shallow(
            <BasketSummary {...props} basketCount={1} />,
        );

        expect(wrapper).toMatchSnapshot();
    });

    it('should render if the basket count is 0', () => {
        const wrapper = shallow(
            <BasketSummary {...props} basketCount={0} />,
        );

        expect(wrapper).toMatchSnapshot();
    });

    it('should render <BasketSummaryListItem /> components', () => {
        const wrapper = shallow(
            <BasketSummary {...props} />,
        );

        expect(wrapper.find('BasketSummaryListItem').length).toBe(2);
    });

    it('should set <BasketSummaryListItem /> props', () => {
        const wrapper = shallow(
            <BasketSummary {...props} />,
        );

        const basketSummary = wrapper.find('BasketSummaryListItem');

        expect(basketSummary.at(0).prop('item')).toBe(item1);
        expect(basketSummary.at(0).prop('addToBasket')).toBe(addToBasket);
        expect(basketSummary.at(0).prop('removeFromBasket')).toBe(removeFromBasket);
        expect(basketSummary.at(0).prop('deleteFromBasket')).toBe(deleteFromBasket);

        expect(basketSummary.at(1).prop('item')).toBe(item2);
        expect(basketSummary.at(1).prop('addToBasket')).toBe(addToBasket);
        expect(basketSummary.at(1).prop('removeFromBasket')).toBe(removeFromBasket);
        expect(basketSummary.at(1).prop('deleteFromBasket')).toBe(deleteFromBasket);
    });
});
