import React from 'react';
import { shallow } from 'enzyme';
import BasketSummaryListItem from './';

const item = { id: 2, price: 2, quantity: 2, remaining: 20 };

const addToBasket = jest.fn();
const removeFromBasket = jest.fn();
const deleteFromBasket = jest.fn();

const props = {
    item,
    addToBasket,
    removeFromBasket,
    deleteFromBasket,
};

describe('BasketSummaryListItem', () => {
    it('should render correctly', () => {
        const wrapper = shallow(
            <BasketSummaryListItem {...props} />,
        );

        expect(wrapper).toMatchSnapshot();
    });

    it('should handle deleteFromBasket correctly', () => {
        const wrapper = shallow(
            <BasketSummaryListItem {...props} />,
        );

        const deleteButton = wrapper.find('IconButton');

        expect(deleteButton.length).toBe(1);
        expect(deleteFromBasket).not.toHaveBeenCalled();

        deleteButton.simulate('click');

        expect(deleteFromBasket).toHaveBeenCalledTimes(1);
        expect(deleteFromBasket).toHaveBeenCalledWith(item);
    });
});
