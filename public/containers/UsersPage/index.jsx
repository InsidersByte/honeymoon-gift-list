/* @flow */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import type { Connector } from 'react-redux';
import { loadUsers, createUser, deleteUser, openUserModal, closeUserModal } from '../../redux/users';
import { getLoggedInUser, getActiveUsers, getInvitedUsers, getIsModalOpen, getIsLoading, getIsSaving, getIsDeleting } from '../../redux';
import UserList from '../../components/UserList';
import UserDialog from '../../components/UserDialog';
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

const mapStateToProps = (state: StateType) => ({
  userModalOpen: getIsModalOpen(state),
  loading: getIsLoading(state),
  saving: getIsSaving(state),
  deleting: getIsDeleting(state),
  loggedInUser: getLoggedInUser(state),
  activeUsers: getActiveUsers(state),
  invitedUsers: getInvitedUsers(state),
});

const mapDispatchToProps = { loadUsers, createUser, deleteUser, openUserModal, closeUserModal };

export class UsersPage extends Component<void, PropsType, LocalStateType> {
  state = { user: { ...initialUser } };

  componentDidMount() {
    this.props.loadUsers();
  }

  setUserState = ({ target }: SyntheticEvent) => {
    if (!(target instanceof HTMLInputElement)) {
      return;
    }

    const { name, value } = target;
    const user = { ...this.state.user, [name]: value };
    this.setState({ user });
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

        <UserDialog user={user} open={open} saving={saving} onHide={onHide} onSubmit={this.save} onChange={this.setUserState} />
      </div>
    );
  }
}

const connector: Connector<PropsType, PropsType> = connect(mapStateToProps, mapDispatchToProps);

export default connector(UsersPage);
