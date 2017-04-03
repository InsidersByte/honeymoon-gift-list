import React from 'react';
import { shallow } from 'enzyme';
import Edit from 'material-ui/svg-icons/image/edit';
import Delete from 'material-ui/svg-icons/action/delete';
import GiftListItem from './';

describe('GiftListItem', () => {
  it('should render correctly', () => {
    const gift = { name: 'gift', imageUrl: 'http://image.png', requested: 5, remaining: 10, price: 20 };
    const onSelect = jest.fn();
    const onDelete = jest.fn();

    const wrapper = shallow(<GiftListItem gift={gift} onSelect={onSelect} onDelete={onDelete} />);

    expect(wrapper).toMatchSnapshot();
    expect(onSelect).not.toHaveBeenCalled();
    expect(onDelete).not.toHaveBeenCalled();
  });

  it('should call on select when edit is clicked', () => {
    const gift = { name: 'gift', imageUrl: 'http://image.png', requested: 5, remaining: 10, price: 20 };
    const onSelect = jest.fn();
    const onDelete = jest.fn();

    const wrapper = shallow(<GiftListItem gift={gift} onSelect={onSelect} onDelete={onDelete} />);

    expect(wrapper.find(Edit).length).toBe(1);
    wrapper.find(Edit).parent().simulate('click');

    expect(onSelect).toHaveBeenCalledWith(gift);
    expect(onDelete).not.toHaveBeenCalled();
  });

  it('should call on delete when delete is clicked', () => {
    const gift = { name: 'gift', imageUrl: 'http://image.png', requested: 5, remaining: 10, price: 20 };
    const onSelect = jest.fn();
    const onDelete = jest.fn();

    const wrapper = shallow(<GiftListItem gift={gift} onSelect={onSelect} onDelete={onDelete} />);

    expect(wrapper.find(Delete).length).toBe(1);
    wrapper.find(Delete).parent().simulate('click');

    expect(onSelect).not.toHaveBeenCalled();
    expect(onDelete).toHaveBeenCalledWith(gift);
  });
});
