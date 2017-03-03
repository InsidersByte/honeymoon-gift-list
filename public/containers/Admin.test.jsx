import React from 'react';
import { shallow } from 'enzyme';
import Admin from './Admin';

describe('Admin', () => {
    it('should render correctly', () => {
        const wrapper = shallow(
            <Admin />,
        );

        expect(wrapper).toMatchSnapshot();
    });
});

