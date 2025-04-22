const urlDatabase = new Map<string, string>();

// This is a simple in-memory data store for URLs
const dataStore = {
  set: (shortCode: string, originalUrl: string): void => {
    urlDatabase.set(shortCode, originalUrl);
  },
  get: (shortCode: string): string | undefined => {
    return urlDatabase.get(shortCode);
  },
  has: (shortCode: string): boolean => {
    return urlDatabase.has(shortCode);
  },
};

export default dataStore;
