// @flow

export const getItem = (key: string): ?string => {
  try {
    const data = localStorage.getItem(key);

    if (data == null) {
      return undefined;
    }

    return data;
  } catch (error) {
    return undefined;
  }
};

export const setItem = (key: string, value: string): void => {
  try {
    localStorage.setItem(key, value);
  } catch (error) {
    // Ignore write error
  }
};

export const removeItem = (key: string): void => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    // Ignore write error
  }
};
