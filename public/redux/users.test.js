import reducer, * as fromUsers from './users';

const initialState = {
  loading: false,
  saving: false,
  deleting: false,
  userModalOpen: false,
  users: [],
};

describe('users', () => {
  describe('actions', () => {
    it('should have an action to open the user modal', () => {
      expect(fromUsers.openUserModal()).toEqual({ type: 'our-wedding-heroes/users/OPEN_USER_MODAL' });
    });

    it('should have an action to close the user modal', () => {
      expect(fromUsers.closeUserModal()).toEqual({ type: 'our-wedding-heroes/users/CLOSE_USER_MODAL' });
    });
  });

  describe('reducer', () => {
    it('should return the initial state', () => {
      expect(reducer(undefined, {})).toEqual(initialState);
    });

    it('should handle OPEN_USER_MODAL', () => {
      expect(reducer({ ...initialState, userModalOpen: false }, { type: 'our-wedding-heroes/users/OPEN_USER_MODAL' })).toEqual({
        loading: false,
        saving: false,
        deleting: false,
        userModalOpen: true,
        users: [],
      });

      expect(reducer({ ...initialState, userModalOpen: true }, { type: 'our-wedding-heroes/users/OPEN_USER_MODAL' })).toEqual({
        loading: false,
        saving: false,
        deleting: false,
        userModalOpen: true,
        users: [],
      });
    });

    it('should handle CLOSE_USER_MODAL', () => {
      expect(reducer({ ...initialState, userModalOpen: false }, { type: 'our-wedding-heroes/users/CLOSE_USER_MODAL' })).toEqual({
        loading: false,
        saving: false,
        deleting: false,
        userModalOpen: false,
        users: [],
      });

      expect(reducer({ ...initialState, userModalOpen: true }, { type: 'our-wedding-heroes/users/CLOSE_USER_MODAL' })).toEqual({
        loading: false,
        saving: false,
        deleting: false,
        userModalOpen: false,
        users: [],
      });
    });

    it('should handle CLOSE_USER_MODAL', () => {
      expect(reducer({ ...initialState, userModalOpen: false }, { type: 'our-wedding-heroes/users/CLOSE_USER_MODAL' })).toEqual({
        loading: false,
        saving: false,
        deleting: false,
        userModalOpen: false,
        users: [],
      });

      expect(reducer({ ...initialState, userModalOpen: true }, { type: 'our-wedding-heroes/users/CLOSE_USER_MODAL' })).toEqual({
        loading: false,
        saving: false,
        deleting: false,
        userModalOpen: false,
        users: [],
      });
    });

    it('should handle LOAD_USERS_REQUEST', () => {
      expect(reducer({ ...initialState, loading: false }, { type: 'our-wedding-heroes/users/LOAD_USERS_REQUEST' })).toEqual({
        loading: true,
        saving: false,
        deleting: false,
        userModalOpen: false,
        users: [],
      });

      expect(reducer({ ...initialState, loading: true }, { type: 'our-wedding-heroes/users/LOAD_USERS_REQUEST' })).toEqual({
        loading: true,
        saving: false,
        deleting: false,
        userModalOpen: false,
        users: [],
      });
    });

    it('should handle LOAD_USERS_SUCCESS', () => {
      const users = [{ id: 1 }, { id: 2 }];

      expect(reducer({ ...initialState, loading: true }, { type: 'our-wedding-heroes/users/LOAD_USERS_SUCCESS', payload: users })).toEqual({
        loading: false,
        saving: false,
        deleting: false,
        userModalOpen: false,
        users,
      });

      expect(reducer({ ...initialState, loading: false }, { type: 'our-wedding-heroes/users/LOAD_USERS_SUCCESS', payload: users })).toEqual({
        loading: false,
        saving: false,
        deleting: false,
        userModalOpen: false,
        users,
      });
    });

    it('should handle LOAD_USERS_ERROR', () => {
      expect(reducer({ ...initialState, loading: true }, { type: 'our-wedding-heroes/users/LOAD_USERS_ERROR' })).toEqual({
        loading: false,
        saving: false,
        deleting: false,
        userModalOpen: false,
        users: [],
      });

      expect(reducer({ ...initialState, loading: false }, { type: 'our-wedding-heroes/users/LOAD_USERS_ERROR' })).toEqual({
        loading: false,
        saving: false,
        deleting: false,
        userModalOpen: false,
        users: [],
      });
    });

    it('should handle CREATE_USER_REQUEST', () => {
      expect(reducer({ ...initialState, saving: true }, { type: 'our-wedding-heroes/users/CREATE_USER_REQUEST' })).toEqual({
        loading: false,
        saving: true,
        deleting: false,
        userModalOpen: false,
        users: [],
      });

      expect(reducer({ ...initialState, saving: false }, { type: 'our-wedding-heroes/users/CREATE_USER_REQUEST' })).toEqual({
        loading: false,
        saving: true,
        deleting: false,
        userModalOpen: false,
        users: [],
      });
    });

    it('should handle CREATE_USER_SUCCESS', () => {
      expect(reducer({ ...initialState, saving: true }, { type: 'our-wedding-heroes/users/CREATE_USER_SUCCESS', payload: { id: 1 } })).toEqual({
        loading: false,
        saving: false,
        deleting: false,
        userModalOpen: false,
        users: [{ id: 1 }],
      });

      expect(
        reducer({ ...initialState, saving: false, users: [{ id: 1 }] }, { type: 'our-wedding-heroes/users/CREATE_USER_SUCCESS', payload: { id: 2 } })
      ).toEqual({
        loading: false,
        saving: false,
        deleting: false,
        userModalOpen: false,
        users: [{ id: 1 }, { id: 2 }],
      });
    });

    it('should handle CREATE_USER_ERROR', () => {
      expect(reducer({ ...initialState, saving: true }, { type: 'our-wedding-heroes/users/CREATE_USER_ERROR' })).toEqual({
        loading: false,
        saving: false,
        deleting: false,
        userModalOpen: false,
        users: [],
      });

      expect(reducer({ ...initialState, saving: false }, { type: 'our-wedding-heroes/users/CREATE_USER_ERROR' })).toEqual({
        loading: false,
        saving: false,
        deleting: false,
        userModalOpen: false,
        users: [],
      });
    });

    it('should handle DELETE_USER_REQUEST', () => {
      expect(
        reducer(
          { ...initialState, deleting: true, users: [{ id: 1 }, { id: 2 }] },
          { type: 'our-wedding-heroes/users/DELETE_USER_REQUEST', payload: { id: 1 } }
        )
      ).toEqual({
        loading: false,
        saving: false,
        deleting: true,
        userModalOpen: false,
        users: [{ id: 2 }],
      });

      expect(
        reducer({ ...initialState, deleting: false, users: [{ id: 1 }] }, { type: 'our-wedding-heroes/users/DELETE_USER_REQUEST', payload: { id: 1 } })
      ).toEqual({
        loading: false,
        saving: false,
        deleting: true,
        userModalOpen: false,
        users: [],
      });
    });

    it('should handle DELETE_USER_SUCCESS', () => {
      expect(reducer({ ...initialState, deleting: true }, { type: 'our-wedding-heroes/users/DELETE_USER_SUCCESS' })).toEqual({
        loading: false,
        saving: false,
        deleting: false,
        userModalOpen: false,
        users: [],
      });

      expect(reducer({ ...initialState, deleting: false }, { type: 'our-wedding-heroes/users/DELETE_USER_SUCCESS' })).toEqual({
        loading: false,
        saving: false,
        deleting: false,
        userModalOpen: false,
        users: [],
      });
    });

    it('should handle DELETE_USER_ERROR', () => {
      expect(reducer({ ...initialState, deleting: true }, { type: 'our-wedding-heroes/users/DELETE_USER_ERROR' })).toEqual({
        loading: false,
        saving: false,
        deleting: false,
        userModalOpen: false,
        users: [],
      });

      expect(reducer({ ...initialState, deleting: false }, { type: 'our-wedding-heroes/users/DELETE_USER_ERROR' })).toEqual({
        loading: false,
        saving: false,
        deleting: false,
        userModalOpen: false,
        users: [],
      });
    });
  });
});
