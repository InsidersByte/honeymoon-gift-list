import React from 'react';
import { shallow } from 'enzyme';
import LandingWeddingPartyMember from './';

describe('LandingWeddingPartyMember', () => {
  it('should render correctly', () => {
    const weddingPartyMember = {
      name: 'Person',
      title: 'Title',
      imageUrl: 'http://image.png',
      description: 'this is a person',
    };

    const wrapper = shallow(<LandingWeddingPartyMember weddingPartyMember={weddingPartyMember} />);

    expect(wrapper).toMatchSnapshot();
  });
});
