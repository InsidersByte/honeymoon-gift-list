import * as selectors from './';
import { getBasketCount, getBasketTotal } from './basket';

jest.mock('./basket');

describe('rootReducer', () => {
  beforeEach(() => {
    getBasketCount.mockClear();
    getBasketTotal.mockClear();
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
});
