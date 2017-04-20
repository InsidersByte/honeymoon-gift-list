import React from 'react';
import { shallow } from 'enzyme';
import Admin from './';

describe('Admin', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<Admin match={{ url: '/admin' }} />);

    expect(wrapper).toMatchSnapshot();
  });
});
