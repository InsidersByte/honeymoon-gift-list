import React from 'react';
import { shallow } from 'enzyme';
import Root from './index.dev';
import configureStore from '../../store/configureStore.dev';

describe('Root', () => {
  it('should render correctly', () => {
    const store = configureStore();

    const wrapper = shallow(
      <Root store={store} history={{}}>
        <h1>Hello World</h1>
      </Root>
    );

    expect(wrapper).toMatchSnapshot();
  });
});
