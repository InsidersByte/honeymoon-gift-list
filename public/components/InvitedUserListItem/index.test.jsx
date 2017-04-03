import React from 'react';
import { shallow, mount } from 'enzyme';
import { IconButton, MuiThemeProvider } from 'material-ui';
import { getMuiTheme } from 'material-ui/styles';
import injectTapEventPlugin from 'react-tap-event-plugin';
import InvitedUserListItem from './';

injectTapEventPlugin();

describe('InvitedUserListItem', () => {
  it('should render correctly', () => {
    const user = { id: 1, email: 'email@email.com', name: 'person' };
    const onDelete = jest.fn();

    const wrapper = shallow(<InvitedUserListItem user={user} onDelete={onDelete} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('should handle delete correctly', () => {
    const user = { id: 1, email: 'email@email.com', name: 'person' };
    const onDelete = jest.fn();

    const wrapper = mount(
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <InvitedUserListItem user={user} onDelete={onDelete} />
      </MuiThemeProvider>
    );

    expect(wrapper.find(IconButton).length).toBe(1);
    wrapper.find(IconButton).simulate('click');

    expect(onDelete).toBeCalledWith(user);
  });
});
