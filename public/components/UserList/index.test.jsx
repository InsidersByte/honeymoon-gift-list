import React from 'react';
import { shallow } from 'enzyme';
import UserList from './';

const onAdd = jest.fn();
const onDelete = jest.fn();

const props = {
  loading: true,
  activeUsers: [{ id: 1 }],
  invitedUsers: [{ id: 2 }],
  loggedInUser: { email: 'test@test.com' },
  onAdd,
  onDelete,
};

describe('UserList', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<UserList {...props} />);

    expect(wrapper).toMatchSnapshot();
    expect(onAdd).not.toHaveBeenCalled();
    expect(onDelete).not.toHaveBeenCalled();
  });
});
