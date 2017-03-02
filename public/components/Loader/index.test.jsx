import React from 'react';
import { shallow } from 'enzyme';
import ReactLoader from 'react-loader';
import Loader from './';

describe('Loader', () => {
    it('should render correctly', () => {
        const wrapper = shallow(
            <Loader loading className="loader">
                <h1>Hello World</h1>
            </Loader>,
        );

        expect(wrapper).toMatchSnapshot();
    });

    it('should default to loading true', () => {
        const wrapper = shallow(
            <Loader className="loader">
                <h1>Hello World</h1>
            </Loader>,
        );

        expect(wrapper.find(ReactLoader).length).toBe(1);
        expect(wrapper.find(ReactLoader).prop('loaded')).toBe(false);
    });
});
