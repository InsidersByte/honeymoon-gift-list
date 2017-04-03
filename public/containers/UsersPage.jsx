/* @flow */

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/users';
import UserList from '../components/UserList';
import User from '../components/UserDialog';

type PropsType = {
  loading: boolean,
  saving: boolean,
  deleting: boolean,
  userModalOpen: boolean,
  activeUsers: Array<{
    id: number,
    name: string,
    email: string,
  }>,
  invitedUsers: Array<{
    id: number,
    email: string,
  }>,
  loggedInUser: {
    email: string,
  },
  actions: {
    loadUsers: Function,
    createUser: Function,
    deleteUser: Function,
    openUserModal: Function,
    closeUserModal: Function,
  },
};

const initialUser = {
  email: '',
};

@connect(
  ({ auth: { user: loggedInUser }, users: { users, ...state } }) => {
    const activeUsers = users.filter(({ status }) => status === 'active');
    const invitedUsers = users.filter(({ status }) => status === 'invited' || status === 'invite_pending');

    return {
      loggedInUser,
      ...state,
      activeUsers,
      invitedUsers,
    };
  },
  dispatch => ({ actions: bindActionCreators(actions, dispatch) })
)
export default class Users extends React.Component {
  props: PropsType;

  state = { user: { ...initialUser } };

  componentDidMount() {
    this.props.actions.loadUsers();
  }

  // FIXME: This seems like a bit of a hack
  componentWillReceiveProps({ saving: nextSaving, deleting: nextDeleting }: PropsType) {
    const { saving, deleting, actions: { loadUsers } } = this.props;

    if (deleting && !nextDeleting) {
      loadUsers();
    }

    if (saving && !nextSaving) {
      loadUsers();
    }
  }

  setUserState = ({ target: { name, value } }: { target: { name: string, value: string } }) => {
    const user = Object.assign(this.state.user, { [name]: value });
    return this.setState({ user });
  };

  save = (event: SyntheticEvent) => {
    event.preventDefault();

    const { actions: { createUser } } = this.props;
    const { user } = this.state;

    createUser(user);
  };

  delete = (user: Object) => {
    if (!confirm('Are you sure you want to delete this user?')) {
      return;
    }

    const { actions: { deleteUser } } = this.props;

    deleteUser(user);
  };

  onAdd = () => {
    this.props.actions.openUserModal();
    this.setState({ user: { ...initialUser } });
  };

  render() {
    const { activeUsers, invitedUsers, saving, loggedInUser, loading, userModalOpen: open, actions: { closeUserModal } } = this.props;
    const { user } = this.state;

    return (
      <div>
        <UserList
          loading={loading}
          activeUsers={activeUsers}
          invitedUsers={invitedUsers}
          loggedInUser={loggedInUser}
          onAdd={this.onAdd}
          onDelete={this.delete}
        />

        <User user={user} open={open} onHide={closeUserModal} onSubmit={this.save} onChange={this.setUserState} saving={saving} />
      </div>
    );
  }
}
