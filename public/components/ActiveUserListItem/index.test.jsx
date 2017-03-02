import React from 'react';
import { shallow, mount } from 'enzyme';
import { IconButton, MuiThemeProvider } from 'material-ui';
import { getMuiTheme } from 'material-ui/styles';
import injectTapEventPlugin from 'react-tap-event-plugin';
import ActiveUserListItem from './';

injectTapEventPlugin();

describe('ActiveUserListItem', () => {
    it('should render deletable correctly', () => {
        const user = { id: 1, email: 'email@email.com', name: 'person' };
        const loggedInUser = { email: 'anotheremail@email.com' };
        const onDelete = jest.fn();

        const wrapper = shallow(
            <ActiveUserListItem user={user} loggedInUser={loggedInUser} onDelete={onDelete} />,
        );

        expect(wrapper).toMatchSnapshot();
        expect(onDelete).not.toHaveBeenCalled();
    });

    it('should handle delete correctly', () => {
        const user = { id: 1, email: 'email@email.com', name: 'person' };
        const loggedInUser = { email: 'anotheremail@email.com' };
        const onDelete = jest.fn();

        const wrapper = mount(
            <MuiThemeProvider muiTheme={getMuiTheme()}>
                <ActiveUserListItem user={user} loggedInUser={loggedInUser} onDelete={onDelete} />
            </MuiThemeProvider>,
        );

        expect(wrapper.find(IconButton).length).toBe(1);
        wrapper.find(IconButton).simulate('click');

        expect(onDelete).toBeCalledWith(user);
    });

    it('should render not deletable correctly', () => {
        const user = { id: 1, email: 'email@email.com', name: 'person' };
        const loggedInUser = { email: 'email@email.com' };
        const onDelete = jest.fn();

        const wrapper = shallow(
            <ActiveUserListItem user={user} loggedInUser={loggedInUser} onDelete={onDelete} />,
        );

        expect(wrapper).toMatchSnapshot();
        expect(onDelete).not.toHaveBeenCalled();
    });
});
