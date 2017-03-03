import React from 'react';
import { shallow } from 'enzyme';
import AdminNotLoggedIn from './AdminNotLoggedIn';

describe('AdminNotLoggedIn', () => {
    it('should render correctly', () => {
        const wrapper = shallow(
            <AdminNotLoggedIn>
                <h1>Hello World</h1>
            </AdminNotLoggedIn>,
        );

        expect(wrapper).toMatchSnapshot();
    });
});
