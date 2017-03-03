import React from 'react';
import { shallow } from 'enzyme';
import Root from './Root.prod';

describe('Root', () => {
    it('should render correctly', () => {
        const wrapper = shallow(
            <Root>
                <h1>Hello World</h1>
            </Root>,
        );

        expect(wrapper).toMatchSnapshot();
    });
});
