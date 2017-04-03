import React from 'react';
import { shallow, mount } from 'enzyme';
import smoothscroll from 'smoothscroll';
import LandingSection from './';

jest.mock('smoothscroll');

describe('LandingItem', () => {
  it('should render correctly', () => {
    const title = 'Hello World';
    const content = 'I am some content';

    const wrapper = shallow(<LandingSection title={title} content={content} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('should call smoothscroll when calling scrollTo', () => {
    const title = 'Hello World';
    const content = 'I am some content';

    const wrapper = mount(<LandingSection title={title} content={content} />);

    expect(wrapper.instance().scrollTo).toBeInstanceOf(Function);
    expect(smoothscroll).not.toHaveBeenCalled();

    wrapper.instance().scrollTo();

    expect(smoothscroll).toHaveBeenCalledTimes(1);
    expect(smoothscroll).toHaveBeenCalledWith(wrapper.instance().landingItem.container);
  });
});
