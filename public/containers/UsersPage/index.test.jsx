import React from 'react';
import { shallow, mount } from 'enzyme';
import { MuiThemeProvider } from 'material-ui';
import { getMuiTheme } from 'material-ui/styles';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { UsersPage } from './';

injectTapEventPlugin();

const confirm = jest.fn(() => false);
const loadUsers = jest.fn();
const createUser = jest.fn();
const deleteUser = jest.fn();
const openUserModal = jest.fn();
const closeUserModal = jest.fn();

const props = {
  loading: true,
  saving: true,
  deleting: true,
  userModalOpen: true,
  activeUsers: [{ id: 1 }],
  invitedUsers: [{ id: 2 }],
  loggedInUser: { email: 'test@test.com' },
  loadUsers,
  createUser,
  deleteUser,
  openUserModal,
  closeUserModal,
};

describe('UsersPage', () => {
  beforeEach(() => {
    global.confirm = confirm;
  });

  it('should render correctly', () => {
    const wrapper = shallow(<UsersPage {...props} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('should initialise state', () => {
    const wrapper = shallow(<UsersPage {...props} />);

    expect(wrapper.state()).toEqual({ user: { email: '' } });
  });

  it('should call loadUsers when component is mounted', () => {
    expect(loadUsers).not.toHaveBeenCalled();

    mount(
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <UsersPage {...props} />
      </MuiThemeProvider>
    );

    expect(loadUsers).toHaveBeenCalledTimes(1);
    expect(loadUsers).toHaveBeenCalledWith();
  });

  it('should render a <UserList /> component', () => {
    const wrapper = shallow(<UsersPage {...props} />);

    expect(wrapper.find('UserList').length).toBe(1);
  });

  it('should set <UserList /> props', () => {
    const wrapper = shallow(<UsersPage {...props} />);

    const userList = wrapper.find('UserList');

    expect(userList.prop('loading')).toBe(props.loading);
    expect(userList.prop('activeUsers')).toBe(props.activeUsers);
    expect(userList.prop('invitedUsers')).toBe(props.invitedUsers);
    expect(userList.prop('loggedInUser')).toBe(props.loggedInUser);
    expect(userList.prop('onAdd')).toBeInstanceOf(Function);
    expect(userList.prop('onDelete')).toBeInstanceOf(Function);
  });

  it('should render a <UserDialog /> component', () => {
    const wrapper = shallow(<UsersPage {...props} />);

    expect(wrapper.find('UserDialog').length).toBe(1);
  });

  it('should set <UserDialog /> props', () => {
    const wrapper = shallow(<UsersPage {...props} />);

    const userList = wrapper.find('UserDialog');

    expect(userList.prop('user')).toEqual({ email: '' });
    expect(userList.prop('open')).toBe(props.userModalOpen);
    expect(userList.prop('saving')).toBe(props.saving);
    expect(userList.prop('onHide')).toBe(closeUserModal);
    expect(userList.prop('onSubmit')).toBeInstanceOf(Function);
    expect(userList.prop('onChange')).toBeInstanceOf(Function);
  });

  it('should call closeUserModal when calling onAdd()', () => {
    const wrapper = shallow(<UsersPage {...props} />);

    expect(openUserModal).not.toHaveBeenCalled();

    wrapper.instance().onAdd();
    expect(openUserModal).toHaveBeenCalledTimes(1);
    expect(openUserModal).toHaveBeenCalledWith();
  });

  it('should reset the user state when calling onAdd()', () => {
    const wrapper = shallow(<UsersPage {...props} />);

    expect(wrapper.state().user).toEqual({ email: '' });
    wrapper.setState({ user: { email: 'test@test.com' } });
    expect(wrapper.state().user).toEqual({ email: 'test@test.com' });

    wrapper.instance().onAdd();
    expect(wrapper.state().user).toEqual({ email: '' });
  });

  it('should call event.preventDefault() when calling save()', () => {
    const wrapper = shallow(<UsersPage {...props} />);
    const event = { preventDefault: jest.fn() };

    expect(event.preventDefault).not.toHaveBeenCalled();

    wrapper.instance().save(event);
    expect(event.preventDefault).toHaveBeenCalledTimes(1);
    expect(event.preventDefault).toHaveBeenCalledWith();
  });

  it('should do nothing if the target is not a HTMLInputElement', () => {
    const wrapper = shallow(<UsersPage {...props} />);

    expect(wrapper.state().user).toEqual({ email: '' });
    wrapper.instance().setUserState({ target: { name: 'email', value: 'test@test.com' } });
    expect(wrapper.state().user).toEqual({ email: '' });
  });

  it('should update state when setUserState() is called', () => {
    const wrapper = shallow(<UsersPage {...props} />);

    const emailInput = document.createElement('input');
    emailInput.setAttribute('name', 'email');
    emailInput.setAttribute('value', 'test@test.com');

    expect(wrapper.state().user).toEqual({ email: '' });
    wrapper.instance().setUserState({ target: emailInput });
    expect(wrapper.state().user).toEqual({ email: 'test@test.com' });

    const anotherPropertyInput = document.createElement('input');
    anotherPropertyInput.setAttribute('name', 'anotherProperty');
    anotherPropertyInput.setAttribute('value', '1');

    wrapper.instance().setUserState({ target: anotherPropertyInput });
    expect(wrapper.state().user).toEqual({ email: 'test@test.com', anotherProperty: '1' });
  });

  it('should call confirm when calling delete()', () => {
    const wrapper = shallow(<UsersPage {...props} />);
    const user = { id: 1 };

    expect(confirm).not.toHaveBeenCalled();

    wrapper.instance().delete(user);

    expect(confirm).toHaveBeenCalledTimes(1);
    expect(confirm).toHaveBeenCalledWith('Are you sure you want to delete this user?');
  });

  it('should not call deleteUser if confirm returns false when calling delete()', () => {
    const wrapper = shallow(<UsersPage {...props} />);
    const user = { id: 1 };

    expect(deleteUser).not.toHaveBeenCalled();

    confirm.mockReturnValueOnce(false);
    wrapper.instance().delete(user);

    expect(deleteUser).not.toHaveBeenCalled();
  });

  it('should call deleteUser if confirm returns true when calling delete()', () => {
    const wrapper = shallow(<UsersPage {...props} />);
    const user = { id: 1 };

    expect(deleteUser).not.toHaveBeenCalled();

    confirm.mockReturnValueOnce(true);
    wrapper.instance().delete(user);

    expect(deleteUser).toHaveBeenCalledTimes(1);
    expect(deleteUser).toHaveBeenCalledWith(user);
  });
});
