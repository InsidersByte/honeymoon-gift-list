import React from 'react';
import { shallow } from 'enzyme';
import ActiveUserList from './';

describe('ActiveUserList', () => {
    it('should render correctly', () => {
        const users = [{ id: 1, email: 'email@email.com', name: 'person' }, { id: 2, email: 'anotheremail@email.com', name: 'foo' }];
        const loggedInUser = { email: 'person@email.com' };
        const onDelete = jest.fn();

        const wrapper = shallow(
            <ActiveUserList users={users} loggedInUser={loggedInUser} onDelete={onDelete} />,
        );

        expect(wrapper).toMatchSnapshot();
        expect(onDelete).not.toHaveBeenCalled();
    });
});
