/**
 * Get an item from localStorage.
 * @param key The key of the item to retrieve.
 * @param defaultValue The default value to return if the item is not found.
 * @returns The retrieved item or the default value.
 */
export function getLocalStorage<T>(key: string, defaultValue: T): T {
  try {
    const item = window.localStorage.getItem(key);
    return item ? (JSON.parse(item) as T) : defaultValue;
  } catch (error) {
    console.error(`Error getting item ${key} from localStorage:`, error);
    return defaultValue;
  }
}

/**
 * Set an item in localStorage.
 * @param key The key of the item to set.
 * @param value The value to set.
 */
export function setLocalStorage<T>(key: string, value: T): void {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error setting item ${key} in localStorage:`, error);
  }
}
