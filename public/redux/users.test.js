import reducer, * as fromUsers from './users';

const initialState = {
  isLoading: false,
  isSaving: false,
  isDeleting: false,
  isModalOpen: false,
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

  describe('selectors', () => {
    it('should return have a selector that returns all active users', () => {
      const users = [{ id: 1, status: 'active' }, { id: 2, status: 'invite_pending' }, { id: 3, status: 'invited' }];
      expect(fromUsers.getActiveUsers({ users })).toEqual([{ id: 1, status: 'active' }]);
    });

    it('should return have a selector that returns all invited users', () => {
      const users = [{ id: 1, status: 'active' }, { id: 2, status: 'invite_pending' }, { id: 3, status: 'invited' }];
      expect(fromUsers.getInvitedUsers({ users })).toEqual([{ id: 2, status: 'invite_pending' }, { id: 3, status: 'invited' }]);
    });

    it('should have a selector that returns isLoading', () => {
      expect(fromUsers.getIsLoading({ isLoading: true })).toBe(true);
    });

    it('should have a selector that returns isSaving', () => {
      expect(fromUsers.getIsSaving({ isSaving: true })).toBe(true);
    });

    it('should have a selector that returns isDeleting', () => {
      expect(fromUsers.getIsDeleting({ isDeleting: true })).toBe(true);
    });

    it('should have a selector that returns isModalOpen', () => {
      expect(fromUsers.getIsModalOpen({ isModalOpen: true })).toBe(true);
    });
  });

  describe('reducer', () => {
    it('should return the initial state', () => {
      expect(reducer(undefined, {})).toEqual(initialState);
    });

    it('should handle OPEN_USER_MODAL', () => {
      expect(reducer({ ...initialState, isModalOpen: false }, { type: 'our-wedding-heroes/users/OPEN_USER_MODAL' })).toEqual({
        isLoading: false,
        isSaving: false,
        isDeleting: false,
        isModalOpen: true,
        users: [],
      });

      expect(reducer({ ...initialState, isModalOpen: true }, { type: 'our-wedding-heroes/users/OPEN_USER_MODAL' })).toEqual({
        isLoading: false,
        isSaving: false,
        isDeleting: false,
        isModalOpen: true,
        users: [],
      });
    });

    it('should handle CLOSE_USER_MODAL', () => {
      expect(reducer({ ...initialState, isModalOpen: false }, { type: 'our-wedding-heroes/users/CLOSE_USER_MODAL' })).toEqual({
        isLoading: false,
        isSaving: false,
        isDeleting: false,
        isModalOpen: false,
        users: [],
      });

      expect(reducer({ ...initialState, isModalOpen: true }, { type: 'our-wedding-heroes/users/CLOSE_USER_MODAL' })).toEqual({
        isLoading: false,
        isSaving: false,
        isDeleting: false,
        isModalOpen: false,
        users: [],
      });
    });

    it('should handle CLOSE_USER_MODAL', () => {
      expect(reducer({ ...initialState, isModalOpen: false }, { type: 'our-wedding-heroes/users/CLOSE_USER_MODAL' })).toEqual({
        isLoading: false,
        isSaving: false,
        isDeleting: false,
        isModalOpen: false,
        users: [],
      });

      expect(reducer({ ...initialState, isModalOpen: true }, { type: 'our-wedding-heroes/users/CLOSE_USER_MODAL' })).toEqual({
        isLoading: false,
        isSaving: false,
        isDeleting: false,
        isModalOpen: false,
        users: [],
      });
    });

    it('should handle LOAD_USERS_REQUEST', () => {
      expect(reducer({ ...initialState, isLoading: false }, { type: 'our-wedding-heroes/users/LOAD_USERS_REQUEST' })).toEqual({
        isLoading: true,
        isSaving: false,
        isDeleting: false,
        isModalOpen: false,
        users: [],
      });

      expect(reducer({ ...initialState, isLoading: true }, { type: 'our-wedding-heroes/users/LOAD_USERS_REQUEST' })).toEqual({
        isLoading: true,
        isSaving: false,
        isDeleting: false,
        isModalOpen: false,
        users: [],
      });
    });

    it('should handle LOAD_USERS_SUCCESS', () => {
      const users = [{ id: 1 }, { id: 2 }];

      expect(reducer({ ...initialState, isLoading: true }, { type: 'our-wedding-heroes/users/LOAD_USERS_SUCCESS', payload: users })).toEqual({
        isLoading: false,
        isSaving: false,
        isDeleting: false,
        isModalOpen: false,
        users,
      });

      expect(reducer({ ...initialState, isLoading: false }, { type: 'our-wedding-heroes/users/LOAD_USERS_SUCCESS', payload: users })).toEqual({
        isLoading: false,
        isSaving: false,
        isDeleting: false,
        isModalOpen: false,
        users,
      });
    });

    it('should handle LOAD_USERS_ERROR', () => {
      expect(reducer({ ...initialState, isLoading: true }, { type: 'our-wedding-heroes/users/LOAD_USERS_ERROR' })).toEqual({
        isLoading: false,
        isSaving: false,
        isDeleting: false,
        isModalOpen: false,
        users: [],
      });

      expect(reducer({ ...initialState, isLoading: false }, { type: 'our-wedding-heroes/users/LOAD_USERS_ERROR' })).toEqual({
        isLoading: false,
        isSaving: false,
        isDeleting: false,
        isModalOpen: false,
        users: [],
      });
    });

    it('should handle CREATE_USER_REQUEST', () => {
      expect(reducer({ ...initialState, isSaving: true }, { type: 'our-wedding-heroes/users/CREATE_USER_REQUEST' })).toEqual({
        isLoading: false,
        isSaving: true,
        isDeleting: false,
        isModalOpen: false,
        users: [],
      });

      expect(reducer({ ...initialState, isSaving: false }, { type: 'our-wedding-heroes/users/CREATE_USER_REQUEST' })).toEqual({
        isLoading: false,
        isSaving: true,
        isDeleting: false,
        isModalOpen: false,
        users: [],
      });
    });

    it('should handle CREATE_USER_SUCCESS', () => {
      expect(reducer({ ...initialState, isSaving: true }, { type: 'our-wedding-heroes/users/CREATE_USER_SUCCESS', payload: { id: 1 } })).toEqual({
        isLoading: false,
        isSaving: false,
        isDeleting: false,
        isModalOpen: false,
        users: [{ id: 1 }],
      });

      expect(
        reducer({ ...initialState, isSaving: false, users: [{ id: 1 }] }, { type: 'our-wedding-heroes/users/CREATE_USER_SUCCESS', payload: { id: 2 } })
      ).toEqual({
        isLoading: false,
        isSaving: false,
        isDeleting: false,
        isModalOpen: false,
        users: [{ id: 1 }, { id: 2 }],
      });
    });

    it('should handle CREATE_USER_ERROR', () => {
      expect(reducer({ ...initialState, isSaving: true }, { type: 'our-wedding-heroes/users/CREATE_USER_ERROR' })).toEqual({
        isLoading: false,
        isSaving: false,
        isDeleting: false,
        isModalOpen: false,
        users: [],
      });

      expect(reducer({ ...initialState, isSaving: false }, { type: 'our-wedding-heroes/users/CREATE_USER_ERROR' })).toEqual({
        isLoading: false,
        isSaving: false,
        isDeleting: false,
        isModalOpen: false,
        users: [],
      });
    });

    it('should handle DELETE_USER_REQUEST', () => {
      expect(
        reducer(
          { ...initialState, isDeleting: true, users: [{ id: 1 }, { id: 2 }] },
          { type: 'our-wedding-heroes/users/DELETE_USER_REQUEST', payload: { id: 1 } }
        )
      ).toEqual({
        isLoading: false,
        isSaving: false,
        isDeleting: true,
        isModalOpen: false,
        users: [{ id: 2 }],
      });

      expect(
        reducer({ ...initialState, isDeleting: false, users: [{ id: 1 }] }, { type: 'our-wedding-heroes/users/DELETE_USER_REQUEST', payload: { id: 1 } })
      ).toEqual({
        isLoading: false,
        isSaving: false,
        isDeleting: true,
        isModalOpen: false,
        users: [],
      });
    });

    it('should handle DELETE_USER_SUCCESS', () => {
      expect(reducer({ ...initialState, isDeleting: true }, { type: 'our-wedding-heroes/users/DELETE_USER_SUCCESS' })).toEqual({
        isLoading: false,
        isSaving: false,
        isDeleting: false,
        isModalOpen: false,
        users: [],
      });

      expect(reducer({ ...initialState, isDeleting: false }, { type: 'our-wedding-heroes/users/DELETE_USER_SUCCESS' })).toEqual({
        isLoading: false,
        isSaving: false,
        isDeleting: false,
        isModalOpen: false,
        users: [],
      });
    });

    it('should handle DELETE_USER_ERROR', () => {
      expect(reducer({ ...initialState, isDeleting: true }, { type: 'our-wedding-heroes/users/DELETE_USER_ERROR' })).toEqual({
        isLoading: false,
        isSaving: false,
        isDeleting: false,
        isModalOpen: false,
        users: [],
      });

      expect(reducer({ ...initialState, isDeleting: false }, { type: 'our-wedding-heroes/users/DELETE_USER_ERROR' })).toEqual({
        isLoading: false,
        isSaving: false,
        isDeleting: false,
        isModalOpen: false,
        users: [],
      });
    });
  });
});
