import React from 'react';
import { shallow } from 'enzyme';
import AdminContainerUnauthenticated from './';

describe('AdminContainerUnauthenticated', () => {
  it('should render correctly', () => {
    const wrapper = shallow(
      <AdminContainerUnauthenticated>
        <h1>Hello World</h1>
      </AdminContainerUnauthenticated>
    );

    expect(wrapper).toMatchSnapshot();
  });
});
