// Utility functions for working with the library modal
import { LibraryCategoryType } from '../models/types';

// Global state to track the currently selected library category
let currentLibraryCategory: LibraryCategoryType | null = null;

/**
 * Set the current library category to be opened when the library modal is shown
 * @param category The category to show in the library
 */
export const setLibraryCategory = (category: string) => {
  currentLibraryCategory = category as LibraryCategoryType;
};

/**
 * Get the current library category, or null if none is set
 * @returns The current library category
 */
export const getLibraryCategory = (): LibraryCategoryType | null => {
  return currentLibraryCategory;
};

/**
 * Clear the current library category
 */
export const clearLibraryCategory = () => {
  currentLibraryCategory = null;
};
