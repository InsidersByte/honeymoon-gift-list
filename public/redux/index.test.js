import * as selectors from './';
import { getBasketCount, getBasketTotal } from './basket';
import { getActiveUsers, getInvitedUsers, getIsModalOpen, getIsLoading, getIsSaving, getIsDeleting } from './users';

jest.mock('./basket');
jest.mock('./users');

describe('rootReducer', () => {
  beforeEach(() => {
    getBasketCount.mockClear();
    getBasketTotal.mockClear();
    getActiveUsers.mockClear();
    getInvitedUsers.mockClear();
    getIsModalOpen.mockClear();
    getIsLoading.mockClear();
    getIsSaving.mockClear();
    getIsDeleting.mockClear();
  });

  describe('getLoggedInUser', () => {
    it('should return the logged in user', () => {
      const state = { auth: { user: { id: 1 } } };
      expect(selectors.getLoggedInUser(state)).toBe(state.auth.user);
    });
  });

  describe('getBasketCount', () => {
    it('should call and return basket.getBasketCount', () => {
      const state = { basket: {} };

      getBasketCount.mockReturnValueOnce(10);

      expect(getBasketCount).not.toHaveBeenCalled();

      expect(selectors.getBasketCount(state)).toBe(10);

      expect(getBasketCount).toHaveBeenCalledTimes(1);
      expect(getBasketCount).toHaveBeenCalledWith(state.basket);
    });
  });

  describe('getBasketTotal', () => {
    it('should call and return basket.getBasketTotal', () => {
      const state = { basket: {} };

      getBasketTotal.mockReturnValueOnce(10);

      expect(getBasketTotal).not.toHaveBeenCalled();

      expect(selectors.getBasketTotal(state)).toBe(10);

      expect(getBasketTotal).toHaveBeenCalledTimes(1);
      expect(getBasketTotal).toHaveBeenCalledWith(state.basket);
    });
  });

  describe('getActiveUsers', () => {
    it('should call and return users.getActiveUsers', () => {
      const state = { users: { users: [{ id: 1 }] } };
      const users = [{ id: 1 }];

      getActiveUsers.mockReturnValueOnce(users);

      expect(getActiveUsers).not.toHaveBeenCalled();

      expect(selectors.getActiveUsers(state)).toBe(users);

      expect(getActiveUsers).toHaveBeenCalledTimes(1);
      expect(getActiveUsers).toHaveBeenCalledWith(state.users);
    });
  });

  describe('getInvitedUsers', () => {
    it('should call and return users.getInvitedUsers', () => {
      const state = { users: { users: [{ id: 1 }] } };
      const users = [{ id: 1 }];

      getInvitedUsers.mockReturnValueOnce(users);

      expect(getInvitedUsers).not.toHaveBeenCalled();

      expect(selectors.getInvitedUsers(state)).toBe(users);

      expect(getInvitedUsers).toHaveBeenCalledTimes(1);
      expect(getInvitedUsers).toHaveBeenCalledWith(state.users);
    });
  });

  describe('getIsModalOpen', () => {
    it('should call and return users.getIsModalOpen', () => {
      const state = { users: { users: [{ id: 1 }] } };

      getIsModalOpen.mockReturnValueOnce(true);

      expect(getIsModalOpen).not.toHaveBeenCalled();

      expect(selectors.getIsModalOpen(state)).toBe(true);

      expect(getIsModalOpen).toHaveBeenCalledTimes(1);
      expect(getIsModalOpen).toHaveBeenCalledWith(state.users);
    });
  });

  describe('getIsLoading', () => {
    it('should call and return users.getIsLoading', () => {
      const state = { users: { users: [{ id: 1 }] } };

      getIsLoading.mockReturnValueOnce(true);

      expect(getIsLoading).not.toHaveBeenCalled();

      expect(selectors.getIsLoading(state)).toBe(true);

      expect(getIsLoading).toHaveBeenCalledTimes(1);
      expect(getIsLoading).toHaveBeenCalledWith(state.users);
    });
  });

  describe('getIsSaving', () => {
    it('should call and return users.getIsSaving', () => {
      const state = { users: { users: [{ id: 1 }] } };

      getIsSaving.mockReturnValueOnce(true);

      expect(getIsSaving).not.toHaveBeenCalled();

      expect(selectors.getIsSaving(state)).toBe(true);

      expect(getIsSaving).toHaveBeenCalledTimes(1);
      expect(getIsSaving).toHaveBeenCalledWith(state.users);
    });
  });

  describe('getIsDeleting', () => {
    it('should call and return users.getIsDeleting', () => {
      const state = { users: { users: [{ id: 1 }] } };

      getIsDeleting.mockReturnValueOnce(true);

      expect(getIsDeleting).not.toHaveBeenCalled();

      expect(selectors.getIsDeleting(state)).toBe(true);

      expect(getIsDeleting).toHaveBeenCalledTimes(1);
      expect(getIsDeleting).toHaveBeenCalledWith(state.users);
    });
  });
});
