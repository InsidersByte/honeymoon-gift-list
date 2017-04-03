import { getItem, setItem, removeItem } from './localStorage';

const localStorage = global.localStorage;
const localStorageGetItem = localStorage.getItem;
const localStorageSetItem = localStorage.setItem;
const localStorageRemoveItem = localStorage.removeItem;

describe('localStorage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.getItem = localStorageGetItem;
    localStorage.setItem = localStorageSetItem;
    localStorage.removeItem = localStorageRemoveItem;
  });

  describe('getItem', () => {
    it('should return undefined if key is not in storage', () => {
      expect(getItem('foobar')).toBe(undefined);
    });

    it('should return value if key is present in storage', () => {
      localStorage.setItem('key', 'some value');

      expect(getItem('key')).toBe('some value');
    });

    it('should return undefined if an error is thrown', () => {
      localStorage.setItem('key', 'value');
      localStorage.getItem = () => {
        throw new Error('error');
      };

      expect(getItem('key')).toBe(undefined);
    });
  });

  describe('setItem', () => {
    it('should add the item to localStorage', () => {
      expect(getItem('key')).toBe(undefined);

      setItem('key', 'a value');

      expect(getItem('key')).toBe('a value');
    });

    it('should return error silently if an error is thrown', () => {
      localStorage.setItem = () => {
        throw new Error('error');
      };

      expect(() => {
        setItem('key', 'value');
      }).not.toThrow();
    });
  });

  describe('removeItem', () => {
    it('should remove item from storage when it exists', () => {
      localStorage.setItem('key', 'value');

      expect(getItem('key')).toBe('value');
      removeItem('key');
      expect(getItem('key')).toBe(undefined);
    });

    it('should not error when key does not exist in storage', () => {
      expect(getItem('key')).toBe(undefined);
      removeItem('key');
      expect(getItem('key')).toBe(undefined);
    });

    it('should return error silently if an error is thrown', () => {
      localStorage.removeItem = () => {
        throw new Error('error');
      };

      expect(() => {
        removeItem('key');
      }).not.toThrow();
    });
  });
});
