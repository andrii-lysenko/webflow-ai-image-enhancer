import { Notify } from "../../sections/chat/utils/notifications";

const API_TOKEN_STORAGE_KEY = "ai-image-enhancer-api-token";

// Utility functions for localStorage handling
export const getStoredApiToken = (): string | null => {
  try {
    return localStorage.getItem(API_TOKEN_STORAGE_KEY);
  } catch (error) {
    Notify.error(`Failed to read API token from localStorage: ${error}`);
    return null;
  }
};

export const setStoredApiToken = (token: string): void => {
  try {
    localStorage.setItem(API_TOKEN_STORAGE_KEY, token);
  } catch (error) {
    Notify.error(`Failed to save API token to localStorage: ${error}`);
  }
};

export const clearStoredApiToken = (): void => {
  try {
    localStorage.removeItem(API_TOKEN_STORAGE_KEY);
  } catch (error) {
    Notify.error(`Failed to clear API token from localStorage: ${error}`);
  }
};
