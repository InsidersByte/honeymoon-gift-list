import React from 'react';
import { shallow, mount } from 'enzyme';
import smoothscroll from 'smoothscroll';
import LandingItem from './';

jest.mock('smoothscroll');

describe('LandingItem', () => {
  it('should render correctly', () => {
    const title = 'Hello World';

    const wrapper = shallow(
      <LandingItem title={title}>
        <h1>A Heading</h1>
      </LandingItem>
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('should call smoothscroll when calling scrollTo', () => {
    const title = 'Hello World';

    const wrapper = mount(
      <LandingItem title={title}>
        <h1>A Heading</h1>
      </LandingItem>
    );

    expect(wrapper.instance().scrollTo).toBeInstanceOf(Function);
    expect(smoothscroll).not.toHaveBeenCalled();

    wrapper.instance().scrollTo();

    expect(smoothscroll).toHaveBeenCalledTimes(1);
    expect(smoothscroll).toHaveBeenCalledWith(wrapper.instance().container);
  });

  it('should render postContent if it exists', () => {
    const title = 'Hello World';

    const wrapper = shallow(
      <LandingItem title={title} postContent={<h1>I come after the content</h1>}>
        <h1>A Heading</h1>
      </LandingItem>
    );

    expect(wrapper).toMatchSnapshot();
  });
});
