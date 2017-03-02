import React from 'react';
import { shallow } from 'enzyme';
import InvitedUserList from './InvitedUserList';

describe('InvitedUserList', () => {
    it('should render correctly', () => {
        const users = [{ id: 1, email: 'email@email.com', name: 'person' }, { id: 2, email: 'anotheremail@email.com', name: 'foo' }];
        const onDelete = jest.fn();

        const wrapper = shallow(
            <InvitedUserList users={users} onDelete={onDelete} />,
        );

        expect(wrapper).toMatchSnapshot();
        expect(onDelete).not.toHaveBeenCalled();
    });

    it('should render null if there are no users', () => {
        const users = [];
        const onDelete = jest.fn();

        const wrapper = shallow(
            <InvitedUserList users={users} onDelete={onDelete} />,
        );

        expect(wrapper.html()).toBe(null);
        expect(onDelete).not.toHaveBeenCalled();
    });
});
