/* @flow */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import type { Connector } from 'react-redux';
import { loadUsers, createUser, deleteUser, openUserModal, closeUserModal } from '../../redux/users';
import UserList from '../../components/UserList';
import User from '../../components/UserDialog';
import type { StateType, UserType, UsersType, AuthUser } from '../../types';

type UnsavedUserType = {
  email: string,
};

type PropsType = {
  loading: boolean,
  saving: boolean,
  deleting: boolean,
  userModalOpen: boolean,
  activeUsers: UsersType,
  invitedUsers: UsersType,
  loggedInUser: AuthUser,
  loadUsers: () => void,
  createUser: (user: UnsavedUserType) => void,
  deleteUser: (user: UserType) => void,
  openUserModal: () => void,
  closeUserModal: () => void,
};

type LocalStateType = {
  user: UnsavedUserType,
};

const initialUser = {
  email: '',
};

const mapStateToProps = ({ auth: { user: loggedInUser }, users: { users, ...state } }: StateType) => {
  const activeUsers = users.filter(({ status }) => status === 'active');
  const invitedUsers = users.filter(({ status }) => status === 'invited' || status === 'invite_pending');

  return {
    loggedInUser,
    ...state,
    activeUsers,
    invitedUsers,
  };
};

const mapDispatchToProps = { loadUsers, createUser, deleteUser, openUserModal, closeUserModal };

class UsersPage extends Component<void, PropsType, LocalStateType> {
  state = { user: { ...initialUser } };

  componentDidMount() {
    this.props.loadUsers();
  }

  // FIXME: This seems like a bit of a hack
  componentWillReceiveProps({ saving: nextSaving, deleting: nextDeleting }: PropsType) {
    const { saving, deleting } = this.props;

    if (deleting && !nextDeleting) {
      this.props.loadUsers();
    }

    if (saving && !nextSaving) {
      this.props.loadUsers();
    }
  }

  setUserState = ({ target: { name, value } }: { target: { name: string, value: string } }) => {
    const user = Object.assign(this.state.user, { [name]: value });
    return this.setState({ user });
  };

  save = (event: SyntheticEvent) => {
    event.preventDefault();
    this.props.createUser(this.state.user);
  };

  delete = (user: Object) => {
    if (!confirm('Are you sure you want to delete this user?')) {
      return;
    }

    this.props.deleteUser(user);
  };

  onAdd = () => {
    this.props.openUserModal();
    this.setState({ user: { ...initialUser } });
  };

  render() {
    const { activeUsers, invitedUsers, saving, loggedInUser, loading, userModalOpen: open, closeUserModal: onHide } = this.props;
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

        <User user={user} open={open} onHide={onHide} onSubmit={this.save} onChange={this.setUserState} saving={saving} />
      </div>
    );
  }
}

const connector: Connector<PropsType, PropsType> = connect(mapStateToProps, mapDispatchToProps);

export default connector(UsersPage);
