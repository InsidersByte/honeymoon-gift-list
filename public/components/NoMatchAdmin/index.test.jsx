import React from 'react';
import { shallow } from 'enzyme';
import NoMatchAdmin from './';

describe('NoMatchAdmin', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<NoMatchAdmin />);
    expect(wrapper).toMatchSnapshot();
  });
});
