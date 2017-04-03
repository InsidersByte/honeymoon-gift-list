import React from 'react';
import { shallow } from 'enzyme';
import NoMatch from './';

describe('NoMatch', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<NoMatch />);
    expect(wrapper).toMatchSnapshot();
  });
});
