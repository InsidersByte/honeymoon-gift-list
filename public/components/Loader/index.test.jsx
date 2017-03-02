import React from 'react';
import { shallow } from 'enzyme';
import Loader from './';

describe('Loader', () => {
    it('should render correctly', () => {
        const wrapper = shallow(
            <Loader loading className="loader">
                <h1>Hello World</h1>
            </Loader>
        );

        expect(wrapper).toMatchSnapshot();
    });
});
